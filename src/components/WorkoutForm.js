import {useState} from 'react';
import {useWorkoutContext} from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
    const {dispatch} = useWorkoutContext();
    const { user } = useAuthContext();

    const [emptyFields, setEmptyFields] = useState([]);

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const pratimas = {title, load, reps};
        const response = await fetch('https://backend-75om.onrender.com/api/pratimai', {
            method: 'POST',
            body: JSON.stringify(pratimas),
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if(!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        } else {
            setEmptyFields([]);
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            console.log('Naujas pratimas pridetas')
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Prideti nauja pratima</h3>
            <label>Pratimo pavadinimas:</label>
            <input className={emptyFields.includes('title') ? 'error' : ''} type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
            <label>Svoris (kg):</label>
            <input className={emptyFields.includes('load') ? 'error' : ''} type="number" onChange={(e) => setLoad(e.target.value)} value={load}/>
            <label>Pratimo pakartojimai:</label>
            <input className={emptyFields.includes('reps') ? 'error' : ''} type="number" onChange={(e) => setReps(e.target.value)} value={reps}/>
            <button>Prideti pratima</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm;
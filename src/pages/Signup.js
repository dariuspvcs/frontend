import { useState } from "react"
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signup, error, isLoading} = useSignup();

    const handeSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);
    }

    return (
        <form className="signup" onSubmit={handeSubmit}>
            <h3>Registracija</h3>
            <label>El. pastas:</label>
            <input type="email" autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <label>Slaptazodis:</label>
            <input type="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button disabled={isLoading}>Registruotis</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SignUp;
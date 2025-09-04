import { useState } from "react"
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login, error, isLoading} = useLogin();

    const handeSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

    return (
        <form className="login" onSubmit={handeSubmit}>
            <h3>Prisijungimas</h3>
            <label>El. pastas:</label>
            <input type="email" autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <label>Slaptazodis:</label>
            <input type="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button disabled={isLoading}>Prisijungti</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login;
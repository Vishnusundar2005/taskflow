import { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            navigate('/dashboard');
        }

    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const res = await API.post('/auth/login', {
                email,
                password
            });

            // 🔥 SAVE TOKEN
            localStorage.setItem("token", res.data.token);

            toast.success("Login success 😎");


            navigate('/dashboard');

        } catch (err) {
            console.log(err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Login failed");
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Welcome Back 👋</h2>

                <form onSubmit={handleLogin} className="auth-form">

                    <div className="input-wrapper">
                        <FiMail className="input-icon" />
                        <input
                            className="auth-input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-wrapper">
                        <FiLock className="input-icon" />
                        <input
                            className="auth-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="auth-button">
                        <FiLogIn style={{ marginRight: "8px" }} />
                        Login
                    </button>

                </form>

                <p className="auth-link">
                    Don't have an account? <a onClick={() => navigate('/')}>Register</a>
                </p>
            </div>
        </div>
    )
}

export default Login;

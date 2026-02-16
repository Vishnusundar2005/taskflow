import { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {

            const res = await API.post('/auth/register', {
                name,
                email,
                password
            });

            console.log(res.data);

            toast.success("User Registered 🔥");
            navigate('/login');

        } catch (err) {
            console.log(err.response?.data || err.message);
            toast.error("Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account 🚀</h2>

                <form onSubmit={handleRegister} className="auth-form">

                    <div className="input-wrapper">
                        <FiUser className="input-icon" />
                        <input
                            className="auth-input"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

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
                        <FiUserPlus style={{ marginRight: "8px" }} />
                        Register
                    </button>

                </form>

                <p className="auth-link">
                    Already have an account? <a onClick={() => navigate('/login')}>Login</a>
                </p>
            </div>
        </div>
    )
}

export default Register;

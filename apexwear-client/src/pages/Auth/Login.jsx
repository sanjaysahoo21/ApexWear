import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/auth/login', {
                email: email.trim(),
                password: password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify({
                    email: response.data.email,
                    role: response.data.role
                }));

                setSuccess('Welcome to ApexWear!');
                setTimeout(() => navigate('/home'), 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <div className="auth-page">
            <div className="auth-split-layout">
                {/* Left Side: Animation + Branding */}
                <div className="auth-left-panel">
                    <div className="left-panel-bg">
                        <div className="panel-blob pb-1"></div>
                        <div className="panel-blob pb-2"></div>
                        <div className="panel-blob pb-3"></div>
                        <div className="panel-blob pb-4"></div>
                    </div>
                    <div className="left-branding">
                        <h1>
                            <span>A</span>pex<br />
                            <span>W</span>ear
                        </h1>
                    </div>
                </div>

                {/* Right Side: Form (Older Style) */}
                <div className="auth-right-panel">
                    <div className="auth-content-container">
                        <div className="auth-header">
                            <h2>Welcome back</h2>
                            <p className="auth-subtitle">Please enter your details to sign in.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-actions">
                                <Link to="#" className="forgot-password-link">Forgot password?</Link>
                            </div>

                            {error && <div className="alert alert-error">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}

                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>

                            <div className="divider">
                                <span>OR</span>
                            </div>

                            <button type="button" onClick={handleGoogleLogin} className="btn-google">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="google-icon" />
                                Sign In with Google
                            </button>

                            <div className="auth-footer">
                                <p>Don't have an account? <Link to="/signup" className="auth-link-primary">Sign up</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
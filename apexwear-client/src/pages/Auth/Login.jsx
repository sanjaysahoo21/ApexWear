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

    const validateForm = () => {
        if (!email.trim()) {
            setError('Email is required');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (!password) {
            setError('Password is required');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/auth/login', {
                email: email.trim(),
                password: password
            });

            // Backend returns: { token, email, role }
            if (response.data.token) {
                // Store JWT token
                localStorage.setItem('token', response.data.token);

                // Store user data
                const userData = {
                    email: response.data.email,
                    role: response.data.role
                };
                localStorage.setItem('user', JSON.stringify(userData));

                setSuccess('Login successful! Redirecting...');
                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            if (err.response?.status === 401) {
                setError('Invalid email or password');
            } else if (err.response?.status === 400) {
                setError('Invalid input. Please check your email and password.');
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.request) {
                setError('Cannot connect to server. Please try again later.');
            } else {
                setError('An error occurred. Please try again.');
            }
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Navigate user to backend OAuth2 authorization endpoint
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1>ApexWear</h1>
                        <h2>Login</h2>
                        <p className="auth-subtitle">Welcome back to ApexWear</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>

                        {error && <div className="alert alert-error">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}

                        <button
                            type="submit"
                            className="btn btn-primary btn-login"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div style={{ marginTop: '1.6rem' }}>
                        <button type="button" onClick={handleGoogleLogin} className="btn btn-google btn-login">
                            Continue with Google
                        </button>
                    </div>

                    <div className="auth-footer">
                        <p>Don't have an account? <Link to="/signup" className="auth-link">Sign up here</Link></p>
                        <Link to="#" className="forgot-password">Forgot password?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
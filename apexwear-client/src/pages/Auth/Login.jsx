import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import LeftImage from '../../assets/figmaAssets/authAssets/Left.png';
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

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                const userData = {
                    email: response.data.email,
                    role: response.data.role
                };
                localStorage.setItem('user', JSON.stringify(userData));

                setSuccess('Login successful!');
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
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <div className="auth-page">
            <div className="auth-split-layout">
                {/* Left Side - Image */}
                <div className="auth-left-panel">
                    <img src={LeftImage} alt="Login Visual" className="auth-hero-image" />
                </div>

                {/* Right Side - Form */}
                <div className="auth-right-panel">
                    <div className="auth-content-container">
                        <div className="auth-header">
                            <h1>Welcome Back</h1>
                            <p className="auth-subtitle">Please enter your details to sign in.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
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
                                <label htmlFor="password">Password</label>
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

                            <div className="form-actions">
                                <Link to="#" className="forgot-password-link">Forgot Password?</Link>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>

                            <div className="divider">
                                <span>Or continue with</span>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="btn btn-google btn-block"
                            >
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="google-icon" />
                                Google
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
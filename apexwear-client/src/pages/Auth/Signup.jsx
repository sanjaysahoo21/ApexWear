import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import './Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const { name, email, password, confirmPassword } = formData;

        if (!name.trim()) {
            setError('Name is required');
            return false;
        }

        if (name.trim().length < 2) {
            setError('Name must be at least 2 characters');
            return false;
        }

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

        if (password !== confirmPassword) {
            setError('Passwords do not match');
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
            const response = await axiosInstance.post('/api/auth/signup', {
                fullname: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password
            });

            // Backend returns: { token, email, role }
            if (response.data.token) {
                // Store token and user data
                localStorage.setItem('token', response.data.token);
                const userData = {
                    email: response.data.email,
                    role: response.data.role
                };
                localStorage.setItem('user', JSON.stringify(userData));
            }

            // Always redirect to login page after successful signup
            setSuccess('Account created successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response?.status === 409) {
                setError('Email already registered. Please log in instead.');
            } else if (err.response?.status === 400) {
                setError('Invalid input. Please check all fields and try again.');
            } else if (err.request) {
                setError('Cannot connect to server. Please try again later.');
            } else {
                setError('An error occurred. Please try again.');
            }
            console.error('Signup error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1>ApexWear</h1>
                        <h2>Create Account</h2>
                        <p className="auth-subtitle">Join ApexWear today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-input"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={loading}
                                required
                            />
                            <p className="form-hint">At least 6 characters</p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="form-input"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
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
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div style={{ marginTop: '1.6rem' }}>
                        <button type="button" onClick={handleGoogleSignup} className="btn btn-google btn-login">
                            Sign Up with Google
                        </button>
                    </div>

                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/login" className="auth-link">Log in here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
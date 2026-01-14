import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import LeftImage from '../../assets/figmaAssets/authAssets/Left.png';
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

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                const userData = {
                    email: response.data.email,
                    role: response.data.role
                };
                localStorage.setItem('user', JSON.stringify(userData));
            }

            setSuccess('Account created successfully!');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
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
        <div className="auth-page">
            <div className="auth-split-layout">
                {/* Left Side - Image */}
                <div className="auth-left-panel">
                    <img src={LeftImage} alt="Signup Visual" className="auth-hero-image" />
                </div>

                {/* Right Side - Form */}
                <div className="auth-right-panel">
                    <div className="auth-content-container">
                        <div className="auth-header">
                            <h1>Create Account</h1>
                            <p className="auth-subtitle">Start your journey with ApexWear.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
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
                                <label htmlFor="email">Email Address</label>
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
                                <label htmlFor="password">Password</label>
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
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
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
                                className="btn btn-primary btn-block"
                                disabled={loading}
                            >
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </button>

                            <div className="divider">
                                <span>Or signup with</span>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleSignup}
                                className="btn btn-google btn-block"
                            >
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="google-icon" />
                                Sign Up with Google
                            </button>

                            <div className="auth-footer">
                                <p>Already have an account? <Link to="/login" className="auth-link-primary">Log in</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
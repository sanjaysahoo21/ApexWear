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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const { name, email, password, confirmPassword } = formData;
        if (!name || !email || !password) return setError('Please fill in all fields');
        if (password !== confirmPassword) return setError('Passwords do not match');

        setLoading(true);
        try {
            await axiosInstance.post('/api/auth/signup', {
                fullname: name.trim(),
                email: email.trim(),
                password: password
            });
            setSuccess('Account created successfully!');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
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
                            <h2>Create account</h2>
                            <p className="auth-subtitle">Start your journey with ApexWear.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label>Full name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    name="confirmPassword"
                                    placeholder="Repeat password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                            </div>

                            {error && <div className="alert alert-error">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}

                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Creating account...' : 'Sign Up'}
                            </button>

                            <div className="divider">
                                <span>OR</span>
                            </div>

                            <button type="button" onClick={handleGoogleSignup} className="btn-google">
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
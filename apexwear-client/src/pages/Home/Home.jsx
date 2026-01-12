import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import './Home.css';

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('Unauthorized - Please login');
            navigate('/login');
            return;
        }

        try {
            const response = await axiosInstance.get('/home');

            setUserData(response.data);
            setLoading(false);
        } catch (err) {
            if (err.response?.status === 401) {
                setError('Unauthorized - Session expired. Please login again.');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else if (err.response?.status === 403) {
                setError('Forbidden - You do not have access to this resource');
            } else {
                setError(err.response?.data?.message || 'Failed to fetch data');
            }
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="home-container">
                <div className="home-card">
                    <div className="loading">Loading...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-container">
                <div className="home-card">
                    <div className="error-message">{error}</div>
                    <button onClick={() => navigate('/login')} className="btn btn-primary">
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="home-container">
            <div className="home-card">
                <div className="home-header">
                    <h1>ApexWear</h1>
                    <h2>Welcome Home!</h2>
                </div>

                <div className="home-content">
                    <div className="user-info">
                        <h3>User Information</h3>
                        <div className="info-item">
                            <span className="label">Name:</span>
                            <span className="value">{user.name || 'Not available'}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Email:</span>
                            <span className="value">{user.email || 'Not available'}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Status:</span>
                            <span className="value success">✓ Authenticated</span>
                        </div>
                    </div>

                    {userData && (
                        <div className="api-response">
                            <h3>API Response</h3>
                            <pre>{JSON.stringify(userData, null, 2)}</pre>
                        </div>
                    )}
                </div>

                <div className="home-actions">
                    <button onClick={handleLogout} className="btn btn-primary">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;


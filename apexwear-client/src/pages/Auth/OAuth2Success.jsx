import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2Success = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const email = params.get('email');
      const role = params.get('role');

      if (!token || !email || !role) {
        setError('Missing authentication data from OAuth2 provider.');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ email, role }));

      // Clean URL and redirect to home
      navigate('/home', { replace: true });
    } catch (e) {
      setError('Failed to process OAuth2 response.');
    }
  }, [navigate]);

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h1>ApexWear</h1>
            <h2>Signing you in…</h2>
          </div>
          {error ? (
            <div className="alert alert-error">{error}</div>
          ) : (
            <div className="loading">Please wait while we complete your login.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OAuth2Success;

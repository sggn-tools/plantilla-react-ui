// src/features/auth/pages/LoginPage.jsx
import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../authSelectors';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true }); // Redirige si ya está autenticado
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-page-container">
      <div className="login-form-card">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
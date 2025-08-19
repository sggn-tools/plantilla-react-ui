import React from 'react';
import { useSelector } from 'react-redux';
import {Outlet, Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../features/auth/authSelectors';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

    
    // Si no está autenticado, redirige al login
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  
};

export default ProtectedRoute;
// src/layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Header = ({ toggleSidebar }) => { // Recibe la función para togglear el sidebar
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Botón de hamburguesa que llama a toggleSidebar */}
        <button className="btn btn-outline-light me-3" onClick={toggleSidebar}>
          <i className="bi bi-list"></i>
        </button>
        <Link className="navbar-brand" to="/home-page">Mi App React</Link>
        <div className="d-flex ms-auto">
          <button className="btn btn-outline-light" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
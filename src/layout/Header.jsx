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
        <Link className="navbar-brand" to="/home-page">Plantilla</Link>
        <div className="d-flex ms-auto">
         <div className="dropdown">
            <button
              className="btn btn-outline-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle me-2"></i> {/* Ícono de perfil */}
              Perfil
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
              <li>
                {/* Opción de Perfil */}
                <Link className="dropdown-item" to="/profile">
                  <i className="bi bi-person me-2"></i> Perfil
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                {/* Opción de Cerrar Sesión */}
                <button
                  className="dropdown-item"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Navbar from './Navbar'; // Importa Navbar desde su feature
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
     // El sidebar inicia colapsado (true) por defecto.
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const wrapperRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Esta función es la única lógica que queda en el JS para el sidebar.
  // Solo alterna la clase 'toggled' y actualiza el estado.
  const handleToggleSidebar = () => {
    if (wrapperRef.current) {
      const isCurrentlyToggled = wrapperRef.current.classList.toggle('toggled');
      setIsSidebarCollapsed(isCurrentlyToggled);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // useEffect para asegurar que la clase 'toggled' esté presente al inicio.
  useEffect(() => {
    if (wrapperRef.current) {
      if (isSidebarCollapsed) {
        wrapperRef.current.classList.add('toggled');
      }
    }
  }, [isSidebarCollapsed]);


  return (
    <div className="app-wrapper">
      <Header toggleSidebar={handleToggleSidebar} handleLogout={handleLogout} />
      <div ref={wrapperRef} className={`wrapper d-flex`}>
        <Navbar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={handleToggleSidebar}
        />
        <div id="content" className="content-area">
          {/* El overlay se renderiza siempre. Su visibilidad la controla CSS */}
          <div className="overlay" onClick={handleToggleSidebar}></div>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
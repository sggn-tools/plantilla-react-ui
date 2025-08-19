import React, { useState } from 'react';
import Header from './Header';
import Navbar from './Navbar'; 
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const MainLayout = () => {
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleSidebar = () =>{
    setIsSidebarCollapsed((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="app-wrapper">
      <Header toggleSidebar={handleToggleSidebar} handleLogout={handleLogout} />
      <div className={`wrapper d-flex ${isSidebarCollapsed ? "toggled" : ""}`}>
        <Navbar isCollapsed={isSidebarCollapsed} toggleSidebar={handleToggleSidebar}/>
        <div id="content" className="content-area">
          {!isSidebarCollapsed && (
            <div className="overlay" onClick={handleToggleSidebar}></div>
          )}
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
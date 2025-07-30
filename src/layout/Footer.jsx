// src/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-light text-center text-lg-start mt-auto py-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <p className="text-muted mb-0">&copy; {currentYear} Mi Aplicación. Todos los derechos reservados.</p>
          </div>
          <div className="col-lg-6 col-md-12">
            <ul className="list-unstyled d-flex justify-content-end mb-0">
              <li className="me-3"><a href="#" className="text-muted text-decoration-none">Privacidad</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Términos</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
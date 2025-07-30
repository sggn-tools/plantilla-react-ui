import React from 'react';

const DashboardPage = () => {
  return (
    <div className="container mt-4 page-container">
      <h1 className="mb-4">Bienvenido al Dashboard</h1>
      <p className="lead">Esta es la página principal de tu aplicación.</p>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Usuarios Activos</h5>
              <p className="card-text fs-2">1,234</p>
              <p className="text-muted">Última actualización: hace 5 min</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Ventas del Día</h5>
              <p className="card-text fs-2">$5,678</p>
              <p className="text-muted">Proyectado: $7,000</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Pedidos Pendientes</h5>
              <p className="card-text fs-2">42</p>
              <p className="text-muted">Prioridad alta: 5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
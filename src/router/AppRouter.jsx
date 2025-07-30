import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSelectors';

// Componentes de Layout
import MainLayout from '../layout/MainLayout';

// Páginas (Lazy loading para optimización)
const LoginPage = React.lazy(() => import('../features/auth/pages/LoginPage'));
const DashboardPage = React.lazy(() => import('../features/dashboard/pages/DashboardPage'));
/*const ReportsPage = React.lazy(() => import('../features/reports/pages/ReportsPage'));
const NotFoundPage = React.lazy(() => import('../common/NotFoundPage'));*/
const ProtectedRoute = React.lazy(() => import('../common/ProtectedRoute')); // También lo hacemos lazy

const AppRouter = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Rutas de autenticación */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : (
            <React.Suspense fallback={<div>Cargando...</div>}>
              <LoginPage />
            </React.Suspense>
          )
        } />

        {/* Ruta raíz: redirige según el estado de autenticación */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />

        {/* Rutas protegidas (dentro del MainLayout) */}
        <Route
          path="/*" // Coincide con cualquier ruta que no sea /login o /
          element={
            <React.Suspense fallback={<div>Cargando...</div>}>
              <ProtectedRoute>
                <MainLayout>
                  {/* Rutas anidadas dentro de MainLayout */}
                  <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    {/*<Route path="/reports" element={<ReportsPage />} />*/}
                    {/* Añade más rutas autenticadas aquí */}
                    {/*<Route path="*" element={<NotFoundPage />} /> {/* Ruta 404 dentro del layout */}
                  </Routes>
                </MainLayout>
              </ProtectedRoute>
            </React.Suspense>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
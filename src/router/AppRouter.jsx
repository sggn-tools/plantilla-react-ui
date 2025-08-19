import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSelectors';

// Páginas (Lazy loading para optimización)
const LoginPage      = React.lazy(() => import('../features/auth/pages/LoginPage'));
const DashboardPage  = React.lazy(() => import('../features/dashboard/pages/DashboardPage'));
const ProtectedRoute = React.lazy(() => import('../common/ProtectedRoute'));
const PublicRoute    = React.lazy(() => import('../common/PublicRoute'));
const MainLayout     = React.lazy(() => import('../layout/MainLayout'));


const AppRouter = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Router>
      <Routes>
        {/** Rutas públicas */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/** Raíz */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />

        {/** Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>

        {/** Ruta 404 */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
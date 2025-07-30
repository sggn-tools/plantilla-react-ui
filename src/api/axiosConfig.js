import axios from 'axios';
import { store } from '../store'; // Importa la store de Redux
import { logout } from '../features/auth/authSlice'; // Importa la acción de logout
import { setLoading } from '../features/ui/uiSlice';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token de autenticación a cada request
axiosInstance.interceptors.request.use(
  (config) => {
    store.dispatch(setLoading(true));
    // Acceder al estado actual de Redux
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta (ej. token expirado o inválido)
axiosInstance.interceptors.response.use(
  (response) => {
    store.dispatch(setLoading(false));
    return response;
  },
  (error) => {
    store.dispatch(setLoading(false));
    // Si la respuesta es 401 Unauthorized y no es la ruta de login
    if (error.response && error.response.status === 401 && !error.config.url.includes('/auth/login')) {
      // Despacha la acción de logout de Redux
      store.dispatch(logout());
      // Opcional: Redirigir explícitamente al login si el router no lo maneja automáticamente
      window.location.href = '/#/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
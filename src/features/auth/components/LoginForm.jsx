// src/features/auth/components/LoginForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../authSlice';
import { loginUser } from '../../../api/authApi';
import { selectAuthLoading, selectAuthError } from '../authSelectors';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('El usuario es requerido'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
});

const LoginForm = () => {

  const dispatch = useDispatch();
  const loading  = useSelector(selectAuthLoading);
  const error    = useSelector(selectAuthError);

  const handleSubmit = async (values, { setSubmitting }) => {

    dispatch(loginStart()); // Indica que el login ha comenzado
    try {
      const data = await loginUser(values);
      
       // Llama a tu API de login
      dispatch(loginSuccess(data)); // Si es exitoso, actualiza el estado de Redux
      // La redirección se manejará en LoginPage al detectar el cambio en isAuthenticated
    } catch (err) {
      dispatch(loginFailure(err.message)); // Si falla, actualiza el estado de Redux con el error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="p-4 rounded shadow-sm bg-white">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario:</label>
            <Field type="text" name="username" id="username" className="form-control" />
            <ErrorMessage name="username" component="div" className="text-danger mt-1" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña:</label>
            <Field type="password" name="password" id="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="text-danger mt-1" />
          </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <button type="submit" className="btn btn-primary w-100 mt-3" disabled={isSubmitting || loading}>
            {loading ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
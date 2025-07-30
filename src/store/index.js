import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Por defecto usa localStorage
import rootReducer from './rootReducer';

// Configuración para redux-persist
const persistConfig = {
  key: 'root', // La clave para el almacenamiento
  storage,     // El tipo de almacenamiento (localStorage)
  whitelist: ['auth'], // Solo persistir el estado del slice 'auth'
  // blacklist: ['menu'] // Si quieres excluir algún slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar estas acciones para redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production', // Habilitar Redux DevTools en desarrollo
});

const persistor = persistStore(store);

export { store, persistor };
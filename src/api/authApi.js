import axiosConfig from './axiosConfig'

export const loginUser = async (credentials) => {
    try {
        const response     = await axiosConfig.post('/auth/login', credentials);
        const responseData = response.data.datos;
        const user = {
            id: responseData.user.id,
            name: responseData.user.name,
            email: responseData.user.email,
            roles: responseData.user.roles,
        }
        const token = responseData.token;
        const menus = responseData.menus;

        return { user, token, menus, message: 'Login successful' };
  
    } catch (error) {
      console.error('Error en loginUser API:', error.response?.data || error.message);
      throw error; // Relanza el error para que el componente/thunk lo maneje
    }
  };
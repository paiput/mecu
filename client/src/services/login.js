const axios = require('axios');
const toast = require('react-hot-toast').toast;

const baseUrl = '/api/login';

const login = credentials => {
  const request = axios.post(baseUrl, credentials);
  toast.promise(request, {
    loading: 'Cargando...',
    error: 'Usuario o contraseña incorrectos',
    success: res => `Hola, ${res.data}`
  });
  return request;
};

const getLoggedUser = () => {
  const request = axios.get('/api/user');
  return request;
};

const logout = () => {
  const request = axios.get('/api/logout');
  return request;
};

const exportableFunctions = { login, getLoggedUser, logout };

export default exportableFunctions;
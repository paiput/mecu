const axios = require('axios');
const toast = require('react-hot-toast').toast;

const baseUrl = '/api/users';

const register = credentials => {
  const request = axios.post(baseUrl, credentials);
  toast.promise(request, {
    loading: 'Cargando...',
    error: err => `${err.response.data}`,
    success: res => `Bienvenid@, ${res.data.username}!`
  });
  return request;
}

const deleteAccount = credentials => {
  const { _id: userId } = credentials;
  const request = axios.delete(`${baseUrl}/${userId}`, credentials);
  return request;
}

const exportableFunctions = { register, deleteAccount };

export default exportableFunctions;
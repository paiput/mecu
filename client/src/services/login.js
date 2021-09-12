const axios = require('axios');

const baseUrl = '/api/login';

const login = credentials => {
  const request = axios.post(baseUrl, credentials);
  return request;
}

const getLoggedUser = () => {
  const request = axios.get('/api/user');
  return request;
}

const logout = () => {
  const request = axios.get('/api/logout');
  return request;
}

const exportableFunctions = { login, getLoggedUser, logout };

export default exportableFunctions;
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

const exportableFunctions = { login, getLoggedUser };

export default exportableFunctions;
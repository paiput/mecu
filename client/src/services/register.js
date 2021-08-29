const axios = require('axios');

const baseUrl = '/api/users';

const register = credentials => {
  const request = axios.post(baseUrl, credentials);
  return request;
}

const exportableFunctions = { register };

export default exportableFunctions;
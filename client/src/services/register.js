const axios = require('axios');

const baseUrl = '/api/users';

const register = credentials => {
  const request = axios.post(baseUrl, credentials);
  return request;
}

const deleteAccount = credentials => {
  const { _id: userId } = credentials;
  const request = axios.delete(`${baseUrl}/${userId}`, credentials);
  return request;
}

const exportableFunctions = { register, deleteAccount };

export default exportableFunctions;
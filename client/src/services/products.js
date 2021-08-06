const axios = require('axios');

const baseUrl = '/api/products';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(res => res.data);
}

const exportableFunctions = { getAll };

export default exportableFunctions;
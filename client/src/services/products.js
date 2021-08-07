const axios = require('axios');

const baseUrl = '/api/products';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(res => res.data);
}

const getProduct = id => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then(res => res.data);
}

const postProduct = product => {
  const request = axios.post(baseUrl, product);
  return request.then(res => res.data);
}

const exportableFunctions = { getAll, getProduct, postProduct };

export default exportableFunctions;
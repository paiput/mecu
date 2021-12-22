const axios = require('axios');
const toast = require('react-hot-toast').toast;

const baseUrl = '/api/products';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(res => res.data);
};

const getProduct = id => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then(res => res.data);
};

const postProduct = product => {
  const request = axios.post(baseUrl, product);
  toast.promise(request, {
    loading: 'Cargando...',
    error: 'Error, el producto no pudo ser publicado',
    success: 'Producto publicado exitosamente'
  });
  return request.then(res => res.data);
};

const exportableFunctions = { getAll, getProduct, postProduct };

export default exportableFunctions;
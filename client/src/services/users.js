const axios = require('axios');

const baseUrl = '/api/users';

const updateUserBalance = (username, amountToLoad) => {
  const request = axios.put(`${baseUrl}/${username}/balance`, amountToLoad);
  return request.then(res => res.data);
}

const handleProductLike = (username, likedProduct) => {
  const request = axios.put(`${baseUrl}/${username}/likes`, likedProduct);
  return request.then(res => res.data);
}

const exportableFunctions = { updateUserBalance, handleProductLike };

export default exportableFunctions;
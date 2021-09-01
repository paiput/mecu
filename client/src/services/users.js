const axios = require('axios');

const baseUrl = '/api/users';

const updateUserBalance = (username, amountToLoad) => {
  const request = axios.put(`${baseUrl}/${username}`, amountToLoad);
  return request.then(res => res.data);
}

const exportableFunctions = { updateUserBalance };

export default exportableFunctions;
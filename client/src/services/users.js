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

const handleProductPurchase = (user, product, amountToBuy) => {
  if (product.price > user.balance) {
    const requests = {
      updatedUser: Promise.reject(new Error('failedUser')),
      updatedProduct: Promise.reject(new Error('failedProduct'))
    }
    return requests;
  }

  const requests = {
    updatedUser: axios.put(`${baseUrl}/${user.username}/balance`, {amountToLoad: `-${product.price * amountToBuy}`}).then(res => res.data),
    updatedProduct: axios.put(`/api/products/${product._id}`, {amountToBuy}).then(res => res.data),
    updatedProductOwner: axios.put(`${baseUrl}/${product.user.username}/balance`, {amountToLoad: `${product.price * amountToBuy}`})
  }
  return requests;
}

const exportableFunctions = { updateUserBalance, handleProductLike, handleProductPurchase };

export default exportableFunctions;
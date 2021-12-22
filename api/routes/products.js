const express = require('express');
const Router = express.Router();
const { cloudinary } = require('../cloudinary');

const Product = require('../models/Product');
const User = require('../models/User');

// get a todos los productos
Router.get('/products', (req, res) => {
  Product.find({})
    .populate('user', {
      products: false
    })
    .exec((err, products) => {
      if (err) { 
        console.error('Error finding products:', err); 
        return res.status(500).send('Error interno del servidor');
      }
      res.status(200).json(products);
    });
});

// get a un producto especifico
Router.get('/products/:id', (req, res) => {
  Product.findById(req.params.id)
    .populate('user')
    .exec(async (err, product) => {
      if (err) {
        console.error('Error finding product:', err);
        return res.status(500).send('Error interno del servidor');
      }
      if (!product) {
        console.error('Product not found');
        return res.status(404).send('Producto no encontrado');
      }

      const user = await User.findOne({ username: product.user.username }).populate('products');
      
      // el toString() es porque userProduct._id se devuelve como ObjectId
      user.products = user.products.filter(userProduct => userProduct._id.toString() !== req.params.id); 
      
      product.user = user;

      res.status(200).json(product);
    });
});

// post de un producto
Router.post('/products', async (req, res) => {
  const { name, img, description, price, quantity, username } = req.body;

  const user = await User.findOne({ username });

  let imgUrl = '';

  if (img) {
    try {
      const uploeadedImg = await cloudinary.uploader.upload(img, { upload_preset: 'mecu_setups' });
      imgUrl = uploeadedImg.url;
    } catch (err) {
      console.error('Error while saving img to cloudinary:', err);
      return res.status(500).send('Error al guardar la imagen del producto');
    }
  } 

  const product = new Product({
    name,
    img: imgUrl,
    description,
    price,
    quantity,
    user
  });

  const savedProduct = await product.save();
  await user.products.concat(savedProduct);

  res.status(201).json(savedProduct);
});

// compra de un producto
Router.put('/products/:id', (req, res) => {
  const { amountToBuy } = req.body;
  Product.findById(req.params.id)
    .exec((err, product) => {
      if (err) {
        console.error('Error when finding product:', err);
        return res.status(500).send('Error interno del servidor');
      }
      if (!product) {
        console.error('Product not found');
        return res.status(404).send('Producto no encontrado');
      }
      
      product.quantity -= Number(amountToBuy);
      product.save((err, updatedProduct) => {
        if (err) {
          console.error('Error when updating product:', err);
          return res.status(500).send('Error al actualizar producto');
        }
        res.status(200).json(updatedProduct);
      });
    });
});

// corregir despues
Router.delete('/products', (req, res) => {
  Product.deleteMany({})
    .then(deletedProducts => {
      console.log('response:', deletedProducts);
      res.status(204).send('All products deleted succesfully');
    })
    .catch(err => {
      console.log('error:', err);
      res.status(500).end();
    });
});
// corregir despues también
Router.delete('/products/:id', (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .exec((err, product) => {
      if (err) {
        console.error('Error when deleting product:', err);
        return res.status(500).send('Error interno del servidor');
      }
      if (!product) {
        console.error('Product not found');
        return res.status(404).send('Producto no encontrado');
      }
      res.status(204).send('Product deleted succesfully');
    });
});

module.exports = Router;
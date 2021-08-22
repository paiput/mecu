const express = require('express');
const Router = express.Router();

const Product = require('../models/Product');
const User = require('../models/User');

Router.get('/products', (req, res) => {
  Product.find({})
    .populate('user')
    .exec((err, products) => {
      if (err) { 
        console.log('Error finding products:', err).end(); 
        res.status(500).send('Could not find products');
      }
      res.status(200).json(products);
    });
});

Router.get('/products/:id', (req, res) => {
  Product.findById(req.params.id)
    .populate('user')
    .exec((err, product) => {
      if (err) {
        console.log('Error finding product:', err);
        res.end();
      }
      if (!product) res.status(404).json({ msg: 'Not found' });
      res.status(200).json(product);
    });
});

Router.post('/products', async (req, res) => {
  const { name, description, price, quantity, username } = req.body;

  const user = await User.findOne({ username });

  console.log('user:', user);

  const product = new Product({
    name,
    description,
    price,
    quantity,
    user
  });

  product.save(async (err, savedProduct) => {
    if (err) {
      console.log('Error saving product:', err);
      res.end();
    }
    user.products = user.products.concat(savedProduct._id);
    await user.save();
    res.status(201).json(savedProduct);
  });
});

// corregir despues
Router.delete('/products', (req, res) => {
  Product.deleteMany({})
    .then(deletedProducts => {
      console.log('response:', deletedProducts)
      res.status(204).send('All products deleted succesfully');
    })
    .catch(err => {
      console.log('error:', err);
      res.status(500).end();
    })
});
// corregir despues también
Router.delete('/products/:id', (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .exec((err, product) => {
      if (err) {
        console.log('Error deleting product:', err);
        res.status(500).end();
      }
      if (!product) res.status(404).json({ msg: 'Not found' });
      res.status(204).send('Product deleted succesfully');
    });
});

module.exports = Router;
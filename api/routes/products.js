const express = require('express');
const Router = express.Router();

const Product = require('../models/Product');

Router.get('/products', (req, res) => {
  Product.find()
    .exec((err, products) => {
      if (err) { 
        console.log('Error finding products:', err).end(); 
        res.end();
      }
      res.status(200).json(products);
    });
});

Router.get('/products/:id', (req, res) => {
  Product.findById(req.params.id)
    .exec((err, product) => {
      if (err) {
        console.log('Error finding product:', err);
        res.end();
      }
      if (!product) res.status(404).json({ msg: 'Not found' });
      res.status(200).json(product);
    });
});

Router.post('/products', (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity
  });
  product.save((err, product) => {
    if (err) {
      console.log('Error saving product:', err);
      res.end();
    }
    res.status(201).json(product);
  });
});

module.exports = Router;
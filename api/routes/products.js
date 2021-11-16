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
        console.log('Error finding products:', err).end(); 
        res.status(500).send('Could not find products');
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
        console.log('Error finding product:', err);
        res.end();
      }
      if (!product) res.status(404).json({ msg: 'Not found' });

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

  // const user = await User.findOne({ username });
  User.findOne({ username })
    .exec((err, user) => {
      if (err) res.status(500).json({ error: 'Error interno del servdior '});
      if (!user) res.status(400).json({ error: 'Debes estar loggeado para publicar un producto '});

      cloudinary.uploader.upload(img, { upload_preset: 'mecu_setups' })
        .then(uploadedImg => {
          const product = new Product({
            name,
            img: uploadedImg.url,
            description,
            price,
            quantity,
            user
          });

          product.save((err, savedProduct) => {
            if (err) res.status(500).json({ error: 'Guardar el producto en la base de datos' });
            user.products = user.products.concat(savedProduct); 
            user.save((err, savedUser) => {
              if (err) res.status(500).json({ error: 'Error al modificar el usuario' });
              res.status(201).json(savedProduct);
            });
          });
      });
    });
});

// compra de un producto
Router.put('/products/:id', (req, res) => {
  const { amountToBuy } = req.body;
  Product.findById(req.params.id)
    .exec((err, product) => {
      if (err) console.log('uy, error', err);
      if (!product) console.log('no se encontro pa');
      
      product.quantity -= Number(amountToBuy);
      product.save((err, updatedProduct) => {
        if (err) console.log('Error al actualizar cantidad:', err);
        res.status(200).json(updatedProduct);
      });
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
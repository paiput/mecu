const bcrypt = require('bcrypt');
const express = require('express');
const passport = require('passport');
const Router = express.Router();

const User = require('../models/User');
const Product = require('../models/Product');

Router.get('/users', (req, res) => {
  User.find({})
    .populate('products', {
      // no retorna el id del usuario
      user: false
    })
    .exec((err, users) => {
      if (err) { 
        console.error('Error finding users:', err); 
        return res.status(500).send('Error interno del servidor');
      }
      res.status(200).json(users);
    });
});

// get a un usuario especifico
Router.get('/users/:username', (req, res) => {
  User.findOne({ username: req.params.username })
    .populate('products', {
      // no retorna el id del usuario
      user: false
    })
    .exec((err, user) => {
      if (err) { 
        console.error('Error finding user:', err); 
        return res.status(500).send('Error interno del servidor');
      }
      res.status(200).json(user);
    });
});

// registro del usuario
Router.post('/users', (req, res) => {
  const { username, name, surname, password, passwordConfirm } = req.body;

  User.findOne({ username }, async (err, user) => {
    if (err) {
      console.error('Error when registering new user:', err);
      return res.status(500).send('Error interno del servidor, intente nuevamente');
    }
    if (user) {
      console.error('User already exists');      
      return res.status(400).send('El usuario ya existe');
    }
    if (!user) {
      if (password !== passwordConfirm) {
        return res.status(400).send('La confirmacion de la contraseña no coincide');
      }

      // el numero tiene que ver con la complejidad del hash
      const passwordHash = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        name,
        surname,
        passwordHash
      });

      user.save((err, savedUser) => {
        if (err) {
          console.error('Error saving user:', err);
          return res.status(500).send('Error al guardar el usuario en la base de datos');
        }
        res.status(201).json(savedUser);
      });
    }
  });
});

// login del usuario
Router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error on login authentication:', err);
      return res.status(500).send('Error interno del servidor');
    };
    if (!user) {
      console.error('Incorrect username or password');
      return res.status(400).send('Usuario o contraseña incorrectos');
    }
    req.logIn(user, (err) => {
      if (err) throw err;
      console.log('Logged succesfuly as', req.user.username);
      res.send(user.name);
    });
  })(req, res, next);
});

// devuelve el usuario una vez iniciada la sesion
Router.get('/user', (req, res) => {
  // req.user guarda todos los datos del usuario que inicia sesion
  if (req.user === undefined) {
    return res.status(401).send('No hay sesion activa');
  }
  User.findOne({ username: req.user.username }) 
    .populate('products', {
      user: false // no devuelve el id del usuario por cada producto
    })
    .populate('likedProducts', {
      user: false
    })
    .exec((err, user) => {
      if (err) { 
        console.error('Error finding logged user:', err); 
        return res.status(500).send('No se pudo encontrar el usuario logueado');
      }
      res.status(200).json(user);
    });
});

// update del saldo de un usuario
Router.put('/users/:username/balance', (req, res) => {
  const { amountToLoad } = req.body;

  User.findOne({ username: req.params.username })
    .exec((err, user) => {
      if (err) { 
        console.error('Error updating user balance:', err); 
        return res.status(500).send('Error interno del servidor');
      }

      user.balance += Number(amountToLoad);

      user.save((err, updatedUser) => {
        if (err) {
          console.log('Error saving user:', err);
          return res.status(500).send('Error interno del servidor');
        }
        res.status(201).json(updatedUser.balance);
      });
    });
});

// añadir producto a favoritos de un usuario
Router.put('/users/:username/likes', (req, res) => {
  const likedProduct = req.body;

  User.findOne({ username: req.params.username })
    .populate('likedProducts')
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send('Error interno del servidor');
      };
      if (!user) {
        console.error('User not found');
        res.send('No se pudo encontrar al usuario')
      }

      if (user.likedProducts.some(product => product._id.toString() === likedProduct._id)) {
        const filteredProducts = user.likedProducts.filter(product => product._id.toString() !== likedProduct._id);
        user.likedProducts = filteredProducts;
        const updatedUser = await user.save();
        res.status(201).json(updatedUser.likedProducts);
      }
      else {
        user.likedProducts = user.likedProducts.concat(likedProduct);
        const updatedUser = await user.save();
        User.findOne({ username: updatedUser.username })
          .populate('likedProducts')
          .exec((err, user) => {
            res.status(201).json(user.likedProducts);
          });
      }
    });
});

// cierre de sesion del usuario
Router.get('/logout', (req, res) => {
  req.logOut();
  res.send('Sesion cerrada exitosamente');
});

// borrar cuenta del usuario
Router.delete('/users/:userId', async (req, res) => {
  // borra todos los productos que haya publicado el usuario
  await Product.deleteMany({ user: { $in: req.params.userId } })
  await User.findByIdAndDelete(req.params.userId);
  res.send('Cuenta borrada exitosamente');
});

// borrar despues
Router.delete('/users', (req, res) => {
  User.deleteMany({})
    .then(res => {
      console.log('response:', res)
      res.json(res);
    })
    .catch(err => {
      console.log('error:', err);
      res.status(500).end();
    })
});

module.exports = Router;
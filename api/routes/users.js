const bcrypt = require('bcrypt');
const express = require('express');
const passport = require('passport');
const Router = express.Router();

const User = require('../models/User');

Router.get('/users', (req, res) => {
  User.find({})
    .populate('products', {
      // no retorna el id del usuario
      user: false
    })
    .exec((err, users) => {
      if (err) { 
        console.log('Error finding users:', err).end(); 
        res.status(500).send('Could not find users');
      }
      res.status(200).json(users);
    });
});

// get a un usuario especifico
Router.get('/users/:username', (req, res) => {
  User.find({ username: req.params.username })
    .populate('products', {
      // no retorna el id del usuario
      user: false
    })
    .exec((err, user) => {
      if (err) { 
        console.log('Error finding user:', err).end(); 
        res.status(500).send('Could not find user');
      }
      res.status(200).json(user);
    });
});

// registro del usuario
Router.post('/users', (req, res) => {
  const { username, name, surname, password } = req.body;

  User.findOne({ username }, async (err, user) => {
    if (err) console.log('Error while checking if user already exists:', err);
    if (user) res.status(400).send('User already exists');
    if (!user) {
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
          console.log('Error saving user:', err);
          res.status(500).end();
        }
        res.status(201).json(savedUser);
      });
    }
  });
});

// login del usuario
Router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.send('User does not exist');
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send('User authenticated succesfully');
        console.log('Logged succesfuly as', req.user.username);
      });
    }
  })(req, res, next);
});

// devuelve el usuario una vez iniciada la sesion
Router.get('/user', (req, res) => {
  res.send(req.user); // req.user guarda todos los datos del usuario que inicia sesion
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
const bcrypt = require('bcrypt');
const express = require('express');
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

// login del usuario
Router.post('/login', (req, res, next) => {

});

module.exports = Router;
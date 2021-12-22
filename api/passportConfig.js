const User = require('./models/User');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { message: 'Nombre de usuario incorrecto.' });
        }
        bcrypt.compare(password, user.passwordHash, (err, result) => {
          if (err) return done(err);
          if (result === true ) return done(null, user);
          else return done(null, false, { message: 'Contraseña incorrecta.' });
        });
      });
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
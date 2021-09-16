const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const session = require('express-session'); // desde la version 1.5 cookie-parser ya no es necesario
const passport = require('passport');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const db = process.env.MONGODB_URI || 'mongodb://localhost/mecu-db';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Connected succesfully to db');
  })
  .catch(err => {
    console.log('Connection error:', err);
  });

// passport
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());
require('./api/passportConfig')(passport);

app.use('/api', require('./api/routes/users'));
app.use('/api', require('./api/routes/products'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
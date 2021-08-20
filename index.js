const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const db = 'mongodb://localhost/mecu-db';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Connected succesfully to db');
  })
  .catch(err => {
    console.log('Connection error:', err);
  });

app.use('/api', require('./api/routes/users'));
app.use('/api', require('./api/routes/products'));

app.get('/', (req,res) => {
  res.send('<h1>Hola</h1>');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
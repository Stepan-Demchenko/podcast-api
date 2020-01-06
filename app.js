const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
require('colors');

const app = express();
const authRoutes = require('./routes/auth.routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const middleware = require('./middleware/jwt');

mongoose
  .connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB'.cyan))
  .catch(e => console.log(e));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

module.exports = app;

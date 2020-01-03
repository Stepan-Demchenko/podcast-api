const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/auth');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const middleware = require('./middleware/jwt');

mongoose.connect('mongodb://localhost:27017/node-app').then(() => console.log('connected to DB')).catch((e) => console.log(e));


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);


module.exports = app;

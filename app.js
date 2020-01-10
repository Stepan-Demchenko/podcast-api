const express = require('express');
const mongoose = require('mongoose');
const { DB_NAME } = require('./config');

require('colors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose
  .connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB'.cyan))
  .catch(e => console.log('Cannot connect to MongoDB'.red));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(bodyParser.json());
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/articles', require('./routes/article.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/podcasts', require('./routes/podcast.routes'));

app.use('/api/uploads', express.static(process.cwd()+'/uploads'));

module.exports = app;

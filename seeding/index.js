require('colors');
const { DB_NAME } = require('../config');
const mongoose = require('mongoose');

const seedName = process.argv[2];

mongoose
  .connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to MongoDB from seeding'.cyan);
    console.log(`Seeding ${seedName}`.cyan);
    const seedFunction = require(`./${seedName}.seed.js`);
    seedFunction();
  })
  .catch(e => console.log('Cannot connect to MongoDB'.red));

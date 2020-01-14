const bcrypt = require('bcrypt');
const User = require('../models/user');
require('colors');

const seedUsers = [
  {
    name: 'Alex',
    nickName: 't-Zander',
    about: 'developer',
    email: 'alex-dev@gmail.com',
    password: 'secret'
  },
  {
    name: 'Stepan',
    nickName: 'stepan',
    about: 'developer',
    email: 'stepan-dev@gmail.com',
    password: '123123'
  }
];

module.exports = async () => {
  const docs = seedUsers.map(
    user => new User({ ...user, password: bcrypt.hashSync(user.password, 10) })
  );
  try {
    const insert = User.insertMany(docs);
    await insert;
    if (process.env.NODE_ENV === 'development') {
      console.log('Seed users created'.green);
    }
    return insert;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Cannot create seed users'.red, error);
    }
  }
};

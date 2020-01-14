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
    await User.insertMany(docs);
    console.log('Seed users created'.green);
  } catch (error) {
    console.log('Cannot create seed users'.red, error);
  }
};

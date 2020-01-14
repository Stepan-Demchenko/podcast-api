const Category = require('../models/category');
require('colors');

const seedCategories = [
  {
    name: 'programming',
    description: 'All about latest programming trends'
  },
  {
    name: 'music',
    description: 'The latest music events'
  }
];

module.exports = async () => {
  const docs = seedCategories.map(category => new Category(category));
  try {
    const insert = Category.insertMany(docs);
    await insert;
    if (process.env.NODE_ENV === 'development') {
      console.log('Seed categories created'.green);
    }

    return insert;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Cannot create seed categories'.red, error);
    }
  }
};

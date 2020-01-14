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
    await Category.insertMany(docs);
    console.log('Seed categories created'.green);
  } catch (error) {
    console.log('Cannot create seed categories'.red, error);
  }
};

const Category = require('../models/category');
const errorHandler = require('../utils/errorHandler');

module.exports = {
  getAll: async (req, res) => {},
  create: async (req, res, next) => {
    try {
      const category = new Category(req.body);
      const result = await category.save();

      res.status(201).json({
        category: result
      });
    } catch (e) {
      errorHandler(res, e);
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;

    try {
      const result = await Category.findByIdAndDelete(id);
      res.status(200).json({
        _id: result._id
      });
    } catch (e) {
      errorHandler(res, e);
    }
  },
  update: async (req, res, next) => {}
};

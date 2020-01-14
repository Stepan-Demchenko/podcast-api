const Category = require('../models/category');
const responseHandler = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');

module.exports = {
  getAll: async (req, res) => {
    try {
      const categories = await Category.find();
      responseHandler(res, 200, categories);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  getById: async function(req, res) {
    try {
      const category = await Category.findById({ _id: req.params.id });
      responseHandler(res, 200, category);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  create: async (req, res, next) => {
    try {
      const category = new Category(req.body);
      const result = await category.save();
      responseHandler(res, 201, result);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await Category.findByIdAndDelete(id);
      responseHandler(res, 200, undefined, 'Removed');
    } catch (e) {
      errorHandler(res, e);
    }
  },
  update: async (req, res, next) => {
    try {
      const category = await Category.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      responseHandler(res, 200, category);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

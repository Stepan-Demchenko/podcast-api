const User = require('../models/user');
const responseHandler = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');

module.exports = {
  getAll: async (req, res) => {
    try {
      const users = await User.find();

      responseHandler(res, 200, users);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  getById: async (req, res) => {
    try {
      const article = await User.findById({ _id: req.params.id });

      responseHandler(res, 200, article);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  create: async (req, res, next) => {
    try {
      const user = new User(req.body);
      const result = await user.save();

      responseHandler(res, 200, result);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await User.findByIdAndDelete(id);

      responseHandler(res, 200, undefined, 'Removed');
    } catch (e) {
      errorHandler(res, e);
    }
  },
  update: async (req, res, next) => {
    try {
      const user = await Article.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true });

      responseHandler(res, 200, user);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

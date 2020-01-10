const Article = require('../models/article');
const responseHandler = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');
const removeFileHandler = require('../utils/removeFileHandler');

module.exports = {
  getAll: async (req, res) => {
    try {
      const articles = await Article.find();
      responseHandler(res, 200, articles);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  getById: async (req, res) => {
    try {
      const article = await Article.findById({ _id: req.params.id });
      responseHandler(res, 200, article);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  create: async (req, res, next) => {
    try {
      const article = new Article(
        {
          title: req.body.title,
          description: req.body.description,
          imageSrc: req.files.map(img => img.path)
        }
      );
      const result = await article.save();

      responseHandler(res, 200, result);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await Article.findByIdAndDelete(id);
      removeFileHandler(result.imageSrc);
      responseHandler(res, 200, undefined, 'Removed');
    } catch (e) {
      errorHandler(res, e);
    }
  },
  update: async (req, res, next) => {
    try {
      const article = await Article.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true });
      responseHandler(res, 200, article);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

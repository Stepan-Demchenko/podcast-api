const Comment = require('../models/comment');
const responseHandler = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');
const removeFileHandler = require('../utils/removeFileHandler');

module.exports = {
  getAll: async (req, res) => {
    try {
      const comments = await Comment.find();
      responseHandler(res, 200, comments);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  getById: async function(req, res) {
    /* try {
      const category = await Category.findById({ _id: req.params.id });
      responseHandler(res, 200, category);
    } catch (e) {
      errorHandler(res, e);
    } */
  },
  create: async (req, res, next) => {
    try {
      const { podcastId } = req.params;
      const comment = new Comment({
        ...req.body,
        author: req.decoded._id,
        podcast: podcastId
      });
      const result = await comment.save();
      responseHandler(res, 201, result);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    try {
<<<<<<< HEAD:controllers/comment.controller.js
      const result = await Comment.findByIdAndDelete(id);
=======
      const result = await Article.findByIdAndDelete(id);
      removeFileHandler(result.imageSrc);
>>>>>>> fe780de7f21912939c41ffa45e124fd4a635493c:controllers/article.controller.js
      responseHandler(res, 200, undefined, 'Removed');
    } catch (e) {
      errorHandler(res, e);
    }
  },
  update: async (req, res, next) => {
    try {
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

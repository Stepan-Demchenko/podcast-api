const Comment = require('../models/comment');
const responseHandler = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');

module.exports = {
  getAll: async (req, res) => {
    try {
      const comments = await Comment.find({ ...req.query }); // if havve any query params use them
      responseHandler(res, 200, comments);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  getById: async function(req, res) {
    try {
      const comment = await Comment.findById(req.params.id);
      responseHandler(res, 200, comment);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  create: async (req, res, next) => {
    try {
      const { userId } = req.decoded;
      const { podcastId } = req.params;
      const comment = new Comment({
        ...req.body,
        author: userId,
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
      await Comment.findByIdAndDelete(id);
      responseHandler(res, 200, null, 'Removed');
    } catch (e) {
      errorHandler(res, e);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await Comment.findByIdAndUpdate(id, req.body, {
        new: true
      });
      responseHandler(res, 201, result);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

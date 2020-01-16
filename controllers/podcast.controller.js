const Podcast = require('../models/podcast');
const removeFileHandler = require('../utils/removeFileHandler');
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');
const paginateResponse = require('../middleware/paginateResult');

module.exports = {
  getAll: async (req, res) => {
    const response = await paginateResponse(req, res, Podcast);
    if (response.data) {
      responseHandler(res, 200, response.data, undefined, response.meta);
    } else {
      errorHandler(res, response.message);
    }
  },
  create: async (req, res) => {
    try {
      const { userId } = req.decoded;
      const podcast = new Podcast({
        title: req.body.title,
        description: req.body.description,
        imagesSrc: req.files['images'] ? req.files['images'].map(img => img.path) : null,
        audioSrc: req.files['audio'] ? req.files['audio'][0].path : null,
        publisher: userId
      });
      const result = await podcast.save();
      responseHandler(res, 200, result);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Podcast.findByIdAndDelete(id);
      removeFileHandler(result.imagesSrc);
      responseHandler(res, 204, undefined, 'Removed');
    } catch (e) {
      errorHandler(res, e);
    }
  },
  update: async (req, res) => {
  }
};

const Podcast = require('../models/podcast');
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');
const paginateResponse = require('../utils/paginateResult');
const removeFileHandler = require('../utils/removeFileHandler');

module.exports = {
  getAll: async (req, res) => {
    const response = await paginateResponse(req, Podcast, 'title description audioSrc');
    if (response.data) {
      responseHandler(res, 200, response.data, undefined, response.meta);
    } else {
      errorHandler(res, response.message);
    }
  },
  getById: async (req, res) => {
    try {
      const channel = await Podcast.findById(req.params.id);
      responseHandler(res, 200, channel);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  create: async (req, res) => {
    try {
      const podcast = new Podcast({
        ...req.body,
        audioSrc: req.file ? req.file.path : '',
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
      removeFileHandler([...result.audioSrc]);
      responseHandler(res, 200, undefined, 'Removed');
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

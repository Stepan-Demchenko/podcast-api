const Podcast = require('../models/podcast');
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');
const removeFileHandler = require('../utils/removeFileHandler');
const paginateResponse = require('../utils/paginateResult');

module.exports = {
  getAll: async (req, res) => {
    const response = await paginateResponse(
      req,
      Podcast,
      'title description imagesSrc publisher categories'
    );
    if (response.data) {
      responseHandler(res, 200, response.data, undefined, response.meta);
    } else {
      errorHandler(res, response.message);
    }
  },
  getById: async (req, res) => {
    try {
      const podcast = await Podcast.findById({ _id: req.params.id });
      responseHandler(res, 200, podcast);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  create: async (req, res) => {
    try {
      const { userId } = req.decoded;
      const podcast = new Podcast({
        title: req.body.title,
        description: req.body.description,
        imagesSrc: req.files['images']
          ? req.files['images'].map(img => img.path)
          : [],
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
      removeFileHandler([...result.imagesSrc, result.audioSrc]);
      responseHandler(res, 200, undefined, 'Removed');
    } catch (e) {
      errorHandler(res, e);
    }
  },
  update: async (req, res) => {}
};

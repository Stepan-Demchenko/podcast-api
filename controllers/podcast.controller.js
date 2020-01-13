const Podcast = require('../models/podcast');
const removeFileHandler = require('../utils/removeFileHandler');
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');

module.exports = {
  getAll: async (req, res) => {},
  create: async (req, res) => {
    console.log('BODY', req.body, req.files, req.decoded);
    try {
      const { userId } = req.decoded;

      const podcast = new Podcast({
        title: req.body.title,
        description: req.body.description,
        imagesSrc: req.files.map(img => img.path),
        publisher: userId
      });
      const result = await podcast.save();
      res.status(201).json({
        podcast: result
      });
    } catch (e) {
      errorHandler(res, e);
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Podcast.findByIdAndDelete(id);
      console.log('RESULT', result);
      removeFileHandler(result.imagesSrc);
      responseHandler(res, 200, null, 'Removed');
    } catch (e) {
      errorHandler(res, e);
    }
  },
  update: async (req, res) => {}
};

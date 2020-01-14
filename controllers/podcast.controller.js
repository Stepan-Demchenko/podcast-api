const Podcast = require('../models/podcast');
const removeFileHandler = require('../utils/removeFileHandler');
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');
<<<<<<< HEAD
=======
const removeFileHandler = require('../utils/removeFileHandler');
>>>>>>> 6073f03dd1aca802017e84a1ee8e12778916896c

module.exports = {
  getAll: async (req, res) => {
    const podcasts = await Podcast.find({})
      .select('title description imagesSrc publisher categories')
      .populate('publisher categories');

    responseHandler(res, 200, podcasts);
  },
  create: async (req, res) => {
    try {
      const { userId } = req.decoded;
      const podcast = new Podcast({
        title: req.body.title,
        description: req.body.description,
        imagesSrc: req.files ? req.files.map(img => img.path) : null,
        audioSrc: req.file ? req.file.path : '',
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
<<<<<<< HEAD
      console.log('RESULT', result);
      removeFileHandler(result.imagesSrc);
      responseHandler(res, 200, null, 'Removed');
=======
      removeFileHandler(result.imagesSrc);
      responseHandler(res, 204, undefined, 'Removed');
>>>>>>> 6073f03dd1aca802017e84a1ee8e12778916896c
    } catch (e) {
      errorHandler(res, e);
    }
  },
  update: async (req, res) => {}
};

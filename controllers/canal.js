const Channel = require('../models/canal');
const Rating = require('../models/rating');
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');
const removeFileHandler = require('../utils/removeFileHandler');
const paginateResponse = require('../utils/paginateResult');
const summaryOfRate = require('../utils/calculateRating');

module.exports = {
  getAll: async (req, res) => {
    const response = await paginateResponse(
      req,
      Channel,
      'title description imageSrc categories'
    );
    if (response.data) {
      responseHandler(res, 200, response.data, undefined, response.meta);
    } else {
      errorHandler(res, response.message);
    }
  },
  getById: async (req, res) => {
    try {
      const canal = await Canal.findById(req.params.id);
      const rate = await summaryOfRate(req.params.id, Rating);
      responseHandler(res, 200, { ...canal.toObject(), ...rate });
    } catch (e) {
      errorHandler(res, e);
    }
  },
  create: async (req, res) => {
    try {
      const { userId } = req.decoded;
      const podcast = new Channel({
        ...req.body,
        imageSrc: req.file ? req.file.filename : null,
        user: userId
      });
      const result = await podcast.save();
      responseHandler(res, 201, result);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Channel.findByIdAndDelete(id);
      removeFileHandler([...result.imageSrc]);
      responseHandler(res, 200, undefined, 'Removed');
    } catch (e) {
      errorHandler(res, e);
    }
  },
  update: async (req, res) => {}
};

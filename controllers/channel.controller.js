const Channel = require('../models/channel');
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
      const channel = await Channel.findById(req.params.id).populate({
        path: 'categories podcasts'
      });
      const rate = await summaryOfRate(req.params.id, Rating);
      responseHandler(res, 200, { ...channel.toObject(), ...rate });
    } catch (e) {
      errorHandler(res, e);
    }
  },
  create: async (req, res) => {
    const { userId } = req.decoded;
    try {
      const channel = new Channel({
        ...req.body,
        imageSrc: req.file ? req.file.filename : null,
        user: userId
      });
      const result = await channel.save();
      responseHandler(res, 200, {
        ...result.toObject(),
        imageSrc: req.file.path
      });
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

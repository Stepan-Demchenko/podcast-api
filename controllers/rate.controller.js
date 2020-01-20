const Rating = require('../models/rating');
const responseHandler = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');

module.exports = {
  setRate: async (req, res) => {
    const { userId } = req.decoded;
    try {
      const setRate = await Rating.findOneAndUpdate(
        { podcast: req.body.podcast, user: userId },
        { $set: req.body },
        { runValidators: true });
      if (setRate) {
        responseHandler(res, 204);
      } else {
        const rate = new Rating({
          ...req.body,
          user: userId
        });
        await rate.save();
        responseHandler(res, 204);
      }
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

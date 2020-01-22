const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const { generateTokens } = require('../utils/generateTokens');
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');

module.exports = {
  login: async (req, res) => {
    const candidate = await User.findOne({
      email: req.body.email
    }).select('+password');

    if (!candidate) {
      return errorHandler(res, new Error('Can`t find user'), 404);
    }
    const checkPassword = await candidate.comparePasswords(req.body.password);

    if (!checkPassword) {
      return errorHandler(res, new Error('Invalid password'), 401);
    }

    const { accessToken, refreshToken } = generateTokens(candidate);

    const refreshTokenForDb = new RefreshToken({
      userId: candidate._id,
      refreshToken
    });

    try {
      await refreshTokenForDb.save();
      res.status(200).json({
        accessToken,
        refreshToken
      });
    } catch (error) {
      errorHandler(res, error, 500);
    }
  },

  register: async (req, res) => {
    const candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
      return errorHandler(res, new Error('User already exist'), 401);
    }
    const user = new User({
      ...req.body,
      avatarSrc: req.file ? req.file.filename : null
    });
    try {
      const newUser = await user.save();
      const tokensPair = generateTokens(newUser);
      responseHandler(res, 201, tokensPair, 'Registered successfully');
    } catch (e) {
      errorHandler(res, e);
    }
  },

  refreshToken: async (req, res) => {
    const { refreshToken } = req.body;
    const foundToken = await RefreshToken.findOne({ refreshToken });
    if (!foundToken) {
      return responseHandler(res, 403, null, 'Invalid refresh token');
    }
    /* Find user associated with the token */
    const associatedUser = await User.findById(foundToken.userId);

    /* Generate new token pair */
    const newTokensPair = generateTokens(associatedUser);

    /* create model for new refresh token */
    const newRefreshTokenDb = new RefreshToken({
      userId: foundToken.userId,
      refreshToken: newTokensPair.refreshToken
    });
    try {
      /* remove previous refresh token and save new refresh token */
      await Promise.all([
        RefreshToken.findByIdAndRemove(foundToken._id).exec(),
        newRefreshTokenDb.save()
      ]);
      responseHandler(res, 200, newTokensPair);
    } catch (error) {
      errorHandler(res, error, 500);
    }
  }
};

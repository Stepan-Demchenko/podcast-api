const User = require('../models/user');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');

const { SECRET_KEY, ACCESS_TOKEN_EXP_TIME } = require('../config');
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
    const token = jwt.sign(
      {
        email: candidate.email,
        userId: candidate._id
      },
      SECRET_KEY,
      { expiresIn: ACCESS_TOKEN_EXP_TIME }
    );
    res.status(200).json({
      token: `Bearer ${token}`
    });
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
      const token = jwt.sign(
        {
          email: newUser.email,
          userId: newUser._id
        },
        SECRET_KEY,
        { expiresIn: ACCESS_TOKEN_EXP_TIME }
      );

      res.status(201).json({
        token: `Bearer ${token}`
      });
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

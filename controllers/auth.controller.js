const User = require('../models/user');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');

module.exports = {
  login: async (req, res) => {
    const candidate = await User.findOne({
      email: req.body.email
    });

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
      process.env.SECRET_KEY,
      { expiresIn: 60 * 60 }
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
      email: req.body.email,
      password: req.body.password
    });
    try {
      const newUser = await user.save();
      const token = jwt.sign(
        {
          email: newUser.email,
          userId: newUser._id
        },
        process.env.SECRET_KEY,
        { expiresIn: 60 * 60 }
      );

      res.status(201).json({
        token: `Bearer ${token}`
      });
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

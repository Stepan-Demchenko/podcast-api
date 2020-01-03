const User = require('../../models/user/user');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const errorHandler = require('../../utils/errorHandler');

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({
    email: req.body.email,
  });

  if (!candidate) {
    return res.status(404).json({
      message: 'Can`t find user'
    })
  }
  const checkPassword = await candidate.comparePasswords(req.body.password);

  if (!checkPassword) {
    return res.status(403).json({
      message: 'Invalid password'
    })
  }
  const token = jwt.sign({
    email: candidate.email,
    userId: candidate._id
  }, config.secretKey, {expiresIn: 60 * 60});
  res.status(200).json({
    token: `Bearer ${token}`
  });
};

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({email: req.body.email});
  if (candidate) {
    res.status(409).json({
      message: 'User already exist'
    });
  } else {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });
    try {
      const newUser = await user.save();
      const token = jwt.sign({
        email: newUser.email,
        userId: newUser._id
      }, config.secretKey, {expiresIn: 60 * 60});

      res.status(201).json({
        token: `Bearer ${token}`
      });
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

const { SECRET_KEY, ACCESS_TOKEN_EXP_TIME } = require('../config');
const jwt = require('jsonwebtoken');

module.exports.genereateToken = user => {
  return jwt.sign(
    {
      email: user.email,
      userId: user._id
    },
    SECRET_KEY,
    { expiresIn: ACCESS_TOKEN_EXP_TIME }
  );
};

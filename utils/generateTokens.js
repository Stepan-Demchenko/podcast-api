const {
  ACESS_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_EXP_TIME,
  REFRESH_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_EXP_TIME
} = require('../config');
const jwt = require('jsonwebtoken');

module.exports.genereateToken = user => {
  return jwt.sign(
    {
      email: user.email,
      userId: user._id
    },
    ACESS_TOKEN_SECRET_KEY,
    { expiresIn: ACCESS_TOKEN_EXP_TIME }
  );
};

module.exports.generateTokens = user => {
  const accessToken = jwt.sign(
    { email: user.email, userId: user._id },
    ACESS_TOKEN_SECRET_KEY,
    { expiresIn: ACCESS_TOKEN_EXP_TIME }
  );
  const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_EXP_TIME
  });
  return {
    accessToken,
    refreshToken
  };
};

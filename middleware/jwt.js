let jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Token is not valid'
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

module.exports = {
  checkToken
};

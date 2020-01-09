let jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const errorHandler = require('../utils/errorHandler');

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return errorHandler(res, 'Auth token is not supplied', 401)
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return errorHandler(res, err, 401);
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

module.exports = {
  checkToken
};

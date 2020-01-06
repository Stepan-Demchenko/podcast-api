const errorHandler = require('../utils/errorHandler');

const validate = schema => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports = {
  validate
};

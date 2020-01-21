const errorHandler = require('../utils/errorHandler');

module.exports.authorize = (role, Schema = null, property = null) => async (
  req,
  res,
  next
) => {
  const { userId } = req.decoded;

  if (Schema && property) {
    const foundDocument = await Schema.findById(req.params.id);
    if (foundDocument[property].equals(userId)) {
      next();
    } else {
      errorHandler(res, 'Unauthorized', 403);
    }
  }
};

module.exports.roles = {
  me: 'me', // user can delete only his own documents
  admin: 'admin' // user can delete everything
};

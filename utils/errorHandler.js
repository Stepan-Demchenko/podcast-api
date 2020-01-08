module.exports = (res, error, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message: error.message ? error.message : error
  });
};

module.exports = (res, statusCode, data=[],  message, meta) => {
  res.status(statusCode).json({
    success: true,
    data:data,
    message: message,
    meta
  });
};

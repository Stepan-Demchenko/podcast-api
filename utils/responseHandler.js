module.exports = (res, statusCode, data=[],  message = '', currentPage=1, per_page=1, total=1, total_pages=1) => {
  res.status(statusCode).json({
    success: statusCode < 400 ? true : false,
    data,
    message: message,
    meta: {
      total,
      currentPage,
      per_page,
      total_pages
    }
  });
};

module.exports = async (req, res, schema) => {
  const page = +req.query.page || 1;
  const per_page = +req.query.per_page || 10;
  const startIndex = (page - 1) * per_page;
  const results = {};
  const query = {};
  if (req.query.startDate) {
    query.date = {
      $gte: req.query.startDate
    };
  }
  if (req.query.endDate) {
    if (!query.date) {
      query.date = {};
    }
    query.date['$lte'] = req.query.endDate;
  }

  try {
    const total = await schema.find(query).countDocuments();
    results.meta = {
      total,
      per_page,
      current_page: page || 1,
      total_pages: Math.ceil(total / per_page)
    };
    results.data = await schema.find(query).limit(per_page).skip(startIndex).exec();
    return results;
  } catch (e) {
    results.message = { message: e.message };
    return results;
  }
};

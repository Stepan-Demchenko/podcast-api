const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = async (searchId, schema) => {
  const rate = await schema.aggregate(
    [{
      $match: { podcast: ObjectId(searchId) }
    },
      { $group: { _id: 0, summaryRate: { $avg: '$rate' } } },
      { $project: { _id: 0 } }
    ]
  );
  // const summaryRate = rates.reduce((sum, current) => sum + current.rate, 0);
  return rate[0];
};

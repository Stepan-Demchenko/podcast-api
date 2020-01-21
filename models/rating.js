const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: 'Rate is not an integer value'
      }
    },
    channel: {
      ref: 'canals',
      type: Schema.Types.ObjectId,
      required: true
    },
    user: {
      ref: 'users',
      type: Schema.Types.ObjectId,
      required: true
    }
  }
);
module.exports = mongoose.model('rating', ratingSchema);

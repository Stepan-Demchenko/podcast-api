const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const podcastSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  publisher: {
    ref: 'users',
    type: Schema.Types.ObjectId
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'participants',
      default: []
    }
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      default: []
    }
  ]
});

module.exports = mongoose.model('podcasts', podcastSchema);

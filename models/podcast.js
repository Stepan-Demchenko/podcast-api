const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const podcastSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  imagesSrc: [
    {
      type: String,
      default: []
    }
  ],
  audioSrc: {
    type: String
    /* required: true */
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
      ref: 'categories'
    }
  ],
  timelines: [
    {
      timeStamp: { type: String, required: true },
      comment: { type: String, required: true }
    }
  ]
});
module.exports = mongoose.model('podcasts', podcastSchema);

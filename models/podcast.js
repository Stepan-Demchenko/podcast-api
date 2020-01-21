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
    type: String,
    required: true
  },
  channel: {
    type: Schema.Types.ObjectId,
    ref: 'channels'
  }
});

module.exports = mongoose.model('podcasts', podcastSchema);

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
  audioSrc: {
    type: String,
    required: true
  },
  canal: {
    type: Schema.Types.ObjectId,
    ref: 'canals'
  }
});

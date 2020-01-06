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
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'categories'
  }]
});
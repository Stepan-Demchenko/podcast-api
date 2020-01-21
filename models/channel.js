const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const canalSchema = new Schema({
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
  imageSrc: {
    type: String,
    required: true
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true
    }
  ],
  user:
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
      unique: true,
      required: true
    }
});
module.exports = mongoose.model('channels', canalSchema);

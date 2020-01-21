const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getFullImgPath } = require('../utils/getFullFilePath');

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
    default: null
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    unique: true,
    required: true
  }
});

canalSchema.post('init', function(doc) {
  console.log('INIT', doc.imageSrc);
  this.imageSrc = getFullImgPath('channel', doc.imageSrc);
});
module.exports = mongoose.model('channels', canalSchema);

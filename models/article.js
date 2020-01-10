const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim:true
  },
  description: {
    type: String,
    required: true,
    trim:true
  },
  imageSrc: [],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'categories'
    }
  ]
});
module.exports = mongoose.model('articles', articleSchema);

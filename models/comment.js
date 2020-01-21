const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true
    },
    canal: {
      ref: 'canals',
      type: Schema.Types.ObjectId,
      required: true
    },
    author: {
      ref: 'users',
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('comments', commentSchema);

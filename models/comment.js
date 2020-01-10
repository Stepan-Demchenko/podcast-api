const mongoose = require('mongoose');
const { Schema } = mongoose;

/* comment can be added either for podcast or for article */
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true
    },
    article: {
      ref: 'articles',
      type: Schema.Types.ObjectId,
      required: function() {
        return !this.podcast;
      }
    },
    podcast: {
      ref: 'podcasts',
      type: Schema.Types.ObjectId,
      required: function() {
        return !this.article;
      }
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

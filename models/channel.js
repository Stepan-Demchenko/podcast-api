const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getFullImgPath } = require('../utils/getFullFilePath');

const channelSchema = new Schema(
  {
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
  },
  {
    toObject: {
      virtuals: true
    }
  }
);

channelSchema.post('init', function(doc) {
  this.imageSrc = getFullImgPath('channel', doc.imageSrc);
});

/* Get all podcasts for this channel */
channelSchema.virtual('podcasts', {
  ref: 'podcasts',
  localField: '_id',
  foreignField: 'channel'
});

module.exports = mongoose.model('channels', channelSchema);

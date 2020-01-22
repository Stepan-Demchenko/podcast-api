const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
  refreshToken: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('refreshTokens', refreshTokenSchema);

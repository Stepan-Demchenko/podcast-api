const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participantSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  systemAssociatedId: {
    type: Schema.Types.ObjectId, // if podcast has participant that registered in the app -> save his id (e.g. to create a link to his profile),
    default: null
  }
});

module.exports = mongoose.model('participants', participantSchema);

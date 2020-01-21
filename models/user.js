const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    surname: {
      type: String,
      default: null,
      trim: true
    },
    lastname: {
      type: String,
      default: null,
      trim: true
    },
    nickName: {
      type: String,
      required: true,
      trim: true
    },
    birthday: {
      type: String,
      required: false
    },
    about: {
      type: String,
      trim: true
    },
    email: {
      required: true,
      type: String,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false
    },
    avatarSrc: {
      type: String,
      default: ''
    },
    canal: {
      type: Schema.Types.ObjectId,
      ref: 'canals'
    }
  },
  {
    timestamps: true
  }
);

userSchema.method('comparePasswords', async function(userPassword) {
  if (this.password) {
    try {
      const result = await bcrypt.compare(userPassword, this.password);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
});

userSchema.pre('save', async function(next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('users', userSchema);

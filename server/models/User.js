const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  publicAddress: {
    type: Number,
    unique: true,
    lowercase: true
  },
  nonce: {
    type: String,
    default: () => Math.floor(Math.random() * 1000000)
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);

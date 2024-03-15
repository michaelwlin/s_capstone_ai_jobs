const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  lastLogin: {
    type: Date,
    required: false
  },
  skills: {
    type: [String],
    required: false
  },
  resume: {
    type: Array,
    required: false
  }
}));

module.exports = User;

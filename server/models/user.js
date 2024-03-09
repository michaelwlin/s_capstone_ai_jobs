const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  userName: {
    type: String, 
    required: true
  },
  role: {
    type: String,
    required: true
  premiumUser: {
    type: Boolean,
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
    required: false,
    unique: true,
  },
  lastLogin: {
    type: Date,
    required: false
  },
  resume: {
    type: Array,
    required: false
  }
}));
module.exports = User;

const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  userName: {
    type: String, 
    required: true
  },
  premiumUser: {
    type: Boolean,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}));

module.exports = User; 
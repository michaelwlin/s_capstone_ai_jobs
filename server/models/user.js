const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  userName: {
    type: String, 
    required: true
  },
  premiumUser: {
    type: Boolean,
    required: false
  },
  password: {
    type: String,
    required: false
  }
}));

module.exports = User; 
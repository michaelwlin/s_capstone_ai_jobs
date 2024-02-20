const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  userName: {
    type: String, 
    required: true
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}));

module.exports = User; 
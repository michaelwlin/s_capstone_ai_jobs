const mongoose = require('mongoose');

const RefreshToken = mongoose.model(
    'RefreshToken',
    new mongoose.Schema({
        user: {
            type: Object,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        expires: {
            type: Date,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            index: { expires: '7d' }
        }
    }));



module.exports = RefreshToken;
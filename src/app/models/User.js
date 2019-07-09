const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    baseColor: {
        type: String,
        require: true,
        default: '#2463D0'
    },
    orientation: {
        type: String,
        require: true,
        default: 'circular',
        lowercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('User', UserSchema)
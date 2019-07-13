const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        default: 'Guest'
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    gravatar: {
        type: String,
        require: true,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('User', UserSchema)

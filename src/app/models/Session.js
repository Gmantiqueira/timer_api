const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({
    sessionName: {
        type: String,
        require: true,
        unique: true,
    },
    passRequired: {
        type: Boolean,
        require: true,
        default: false
    },
    password: {
        type: String,
        require: true,
        default: null
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now
    },

    totalTime: {
        type: Number,
        require: true,
        default: null
    },
    endline: {
        type: Date,
        require: true,
        default: null
    },

    isRunning: {
        type: Boolean,
        default: false
    },
    isPaused: {
        type: Boolean,
        default: false
    },
    timerList: {
        type: Array,
        default: [1, 3, 5, 10, 20]
      }
})

module.exports = mongoose.model('Session', SessionSchema)
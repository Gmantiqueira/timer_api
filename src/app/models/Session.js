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
    isRunning: {
        type: Boolean,
        default: false
    },
    isPaused: {
        type: Boolean,
        default: false
    },
    delayStart: {
        type: Date,
        require: true,
        default: Date.now()
    },
    timerList: {
        type: Array,
        default: [1, 3, 5, 10, 20]
    },
      createdAt: {
        type: Date,
        require: true,
        default: Date.now
    },
})

module.exports = mongoose.model('Session', SessionSchema)

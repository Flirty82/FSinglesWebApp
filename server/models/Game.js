const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    players: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        },
        ready: {
            type: Boolean,
            default: false
        }
    }],
    status: {
        type: String,
        enum: ['waiting', 'in-progress', 'finished'],
        default: 'waiting'
    },
    settings: {
        maxPlayers: {
            type: Number,
            default: 10,
            min: 2,
            max: 20
        },
        gameMode: {
            type: String,
            enum: ['classic', 'speed', 'dating-themed'],
            default: 'dating-themed'
        },
        timeLimit: {
            type: Number,
            default: 600 // 10 minutes in seconds
        }
    },
    currentNumbers: [Number],
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    gameCode: {
        type: String,
        unique: true,
        required: true
    },
    startedAt: Date,
    endedAt: Date
});

module.exports = mongoose.model('Game', gameSchema);
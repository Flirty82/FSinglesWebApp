const mongoose = require('mongoose');

const bingoCardSchema = new mongoose.Schema({
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    grid: [[{
        value: String,
        marked: {
            type: Boolean,
            default: false
        },
        markedAt: Date
    }]],
    completedLines: [{
        type: {
            type: String,
            enum: ['row', 'column', 'diagonal']
        },
        index: Number,
        completedAt: {
            type: Date,
            default: Date.now
        }
    }],
    isWinner: {
        type: Boolean,
        default: false
    },
    score: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BingoCard', bingoCardSchema);
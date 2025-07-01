const mongoose = require('mongoose');

const BingoGameSchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    calledNumbers: [Numer], // Numbers to be drawn
    playerCards: {
        type: Map,
        of: [[Number]], // 5x5 card as2D array per user
    },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('BingoGame', BingoGameSchema);
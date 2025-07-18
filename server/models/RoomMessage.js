const mongoose = require('mongoose');

const roomMessageSchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RoomMessage', RoomMessageSchema);
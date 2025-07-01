const mongoose = require('mongoose');

const ChatRoom = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["public", "private"], default: "public" },
    memebers: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
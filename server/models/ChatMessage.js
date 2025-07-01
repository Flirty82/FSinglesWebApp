const mongoose = require('mongoose');

const ChatMessage = new mongoose.Schema({
    chatroom: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
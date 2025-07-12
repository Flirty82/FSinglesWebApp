const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["public", "private", default: "public" ] },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
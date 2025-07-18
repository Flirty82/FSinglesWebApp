const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    title: String,
    type: String, // "bingo", "movie-nights", "truth_or_dare"
    hostUserId: mongoose.ObjectId,
    paricipants: [{ userId: mongoose.ObjectId, joinedAt: Date }],
    isLive: Boolean,
    scheduledAt: Date,
    maxCapacity: Number,
    settings: mongoose.Schema.Types.ObjectId.Mixed, // game-specific settings
});

module.exports = mongoose.model('Room', RoomSchema);
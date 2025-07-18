const RoomSchema = new mongoose.Schema({
    title: String,
    hostUserId: mongoose.objectId,
    type: String, // "bingo", "karaoke", "movie-night"
    participants: [{ userId: mongoose.OjectId, joinedAt: date }],
    isLive: Boolean,
    scheduledAt: Date,
    maxCapacity: Number,
    settings: mongoose.Schema.Types.Mixed, // custimization for game-specified rules
});
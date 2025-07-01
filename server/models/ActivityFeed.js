const mongoose = require('mongoose');

const ActivityFeedSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, content: String, timestamps: {
        type: Date,
        Default: Date.now
    }}],
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ActivityFeed', ActivityFeedSchema);
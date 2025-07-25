const mongoose = require('mongoose');

const ModerationSchema = new mongoose.Schema({
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reportedContentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    contentType: { type: String, enum: ["message", "post", "profile", "user"], required: true },
    reason: { type: String, required: true },
    status: {
        type: String, enum: ["pending", "reviewed", "resolved"], default: "pending", required: true
    },
});

module.exports = mongoose.model('Moderation', ModerationSchema);
const mongoose = require('mongoose');

const Analytics = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lastLogin: { type: Date, default: Date.now },
    messageSent: { type: Number, default: 0 },
    postCreated: { type: Number, default: 0 },
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    matchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Match', MatchSchema);
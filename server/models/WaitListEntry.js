const mongoose = require('mongoose');

const WaitListEntrySchema = new mongoose.Schema({
    email: { type: String, required: true },
    refCode: { type: String, unique: true },
    referredBy: { type: String }, // another user's refCode
    referrals: { type: Number, default: 0 },
    joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WaitListEntry', WaitListEntrySchema);
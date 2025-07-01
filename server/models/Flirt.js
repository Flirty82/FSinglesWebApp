const mongoose = require('mongoose');

const flirtSchema = new mongoose.Schema({
    senderId: String,
    receiverId: String,
    status: { type: String, enum: ["Pending", "Accepted", "Ignored", "Blocked"], default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flirt', flirtSchema);
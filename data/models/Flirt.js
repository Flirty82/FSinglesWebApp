const mongoose = require('mongoose');

const flirtSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', accepted, 'ignore', block] },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flirt', flirtSchema);
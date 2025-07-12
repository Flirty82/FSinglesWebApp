const mongoose = require('mongoose');

const flirtSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', accepted, 'ignore', block] },
    timestamp: { type: Date, default: Date.now }
});
flirtsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
flirtsReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],


module.exports = mongoose.model('Flirt', flirtSchema);
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userId: String,
    matchId: String,
    rating: Number,
    comments: String
});

module.exports = mongoose.model('Feedback', feedbackSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    age: Number,
    gender: String,
    location: String,
    interests: [String],
    personalityType: String,
    lifestyle: String,
    photo: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    preferences: {
        ageRange: [Number],
        gender: String,
        interests: [String],
        locationRadius: Number
    }
});

module.exports = mongoose.model('User', userSchema);
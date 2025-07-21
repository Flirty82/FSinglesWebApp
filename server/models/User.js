const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    age: Number,
    gender: String,
    location: String,
    interests: [String],
    personalityType: String,
    lifestyle: String,
    preferences: {
        ageRange: [Number],
        gender: String,
        interests: [String],
        locationRadius: Number
    }
});

module.exports = mongoose.model('User', userSchema);
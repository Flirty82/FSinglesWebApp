const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bio: String,
    photo: String,
    video: String
});

module.exports = mongoose.model('Profile', ProfileSetupSchema);
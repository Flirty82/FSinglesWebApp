const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    preferences: {
        gender: String,
        ageRange: [Number],
        interests: [String],
        location: String,
    },
    bio: String,
    profilePicture: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    isProfileComplete: { type: Boolean, default: false },
    membership: { type: String, enum: ["free", "gold", "platinum", "diamond"], default: "free" }
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = awaits('this.password', 10);
});

module.exports = mongoose.model('User', UserSchema);
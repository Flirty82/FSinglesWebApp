const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fuzzySearching = require('mongoose-fuzzy-searching');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    membership: { type: String, enum: ["free", "gold", "platinum", "diamond"], default: "free" }
    membershipExpires: { type: Date, default: null },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    interests: { type: [String], default: [] },
    datingPreferences: {
        gender: { type: String, enum: ["male", "female", "non-binary", "any"] },
        ageRange: { type: [Number], default: [18, 50] },
        location: { type: String, default: "" }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.plugin(fuzzySearching, { fields: ["username", "interests"] });

const UserSchema = new mongoose.Schema({
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    visibility: { type: String, enum: ["public", "private"], default: "public" },
});

module.exports = mongoose.model('User', userSchema);
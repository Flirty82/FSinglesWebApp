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
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.schema.Types.ObjectId, ref: 'User' }],
    vidoeProfile: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
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

// Profile Info
profilePic: { type: String },
bio: { type: String }
gender: { type: String, enum: ["male", "female", "rather not say"], default: "other" },
{ type: Number },
location: { type: String, defautl: '' },

// Dating Preferences
lookingFor: { type: String, enum: ["male", "female", "both"] },
ageRange: {
    min: { type: Number, default: 18 },
    max: { type: Number, default: 99 },
},

// Video Profile
videoUrl: { type: String },

// Membership
membership: { type: String, enum: ["free", "gold", "[platinum", "diamond", default: "free"] },
{ timestamp: true });

module.exports = mongoose.model('User', userSchema);


const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    membership: {
        type: String,
        enum: ['Free', 'Gold', 'Platinum', 'Diamond'],
        default: 'Free'
    },
    bio: String,
    photoUrl: String,
    createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    membership: {
        type: String,
        enum: ["free', "gold", "platinum", "diamond"],
        default: "free"
    },
});

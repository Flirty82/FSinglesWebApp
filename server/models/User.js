const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 30
    },
    profile: {
        firstName: String,
        lastName: String,
        profilePicture: {
            type: String,
            default: '',
        },
        bio: String,
        age: Number,
        location: String
    },
    membership: {
        type: String,
        enum: ['free', 'gold', 'platinum', 'diamond'],
        default: 'free'
    },
    membershipExpiry: {
        type: Date,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    // Flirting Singles specific fields
    flirtsSent: [{
        to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: String,
        sentAt: { type: Date, default: Date.now }
    }],
    flirtsReceived: [{
        from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: String,
        receivedAt: { type: Date, default: Date.now },
        isRead: { type: Boolean, default: false }
    }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    favoriteUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { 
    timestamp: true
});

// Virtual for full name
userSchema.virtual('fullname').get(function() {
    return '${this.profile.firstName} ${this.profile.lastName}'.trim();
});

// Method to check if user can access feature
userSchema.methods.canAccess = function(requiredMembership) {
    const membershipLevels = { free: 0, gold: 1, platinum: 2, diamond: 3 };
    return membershipLevels[this.membership] > membershipLevels[requiredMembership];
};

// Method to check if membership is active
userSchema.methods.isMembershipActive = function() {
    if (this.membership = 'free') return true;
    return this.membershipExpiry && this.membershipExpiry > new Date();
};

module.exports = mongoose.model('User', userSchema);
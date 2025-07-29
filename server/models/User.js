const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 8
    },
    profile: {
        displayName: String,
        bio: String,
        age: Number,
        location: String,
        interests: [String],
        profilePicture: String
    },
    karaoke: {
        favorite_songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
        performances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Performances' }],
        score_average: { type: Number, default: 0 },
        total_performance: { type: Number, default: 0 },
        skill_level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' }
    },
    subscription: {
        type: { type: String, enum: ['free', 'gold', 'platinum', 'diamond']},
        expiresAt: Date,
        paypal_subscription_id: String,
        payment_history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }]
    },
    matches: {
        liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        disliked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        mutual_matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }]
    },
    settings: {
        privacy: {
            show_age: { type: Boolean, default: true },
            show_location: { type: Boolean, default: true },
            discoverable: { type: Boolean, default: true }
        }
    },
    notifications: {
        new_matches: { type: Boolean, default: true },
        messages: { type: Boolean, default: true },
        karaoke_invites: { type: Boolean, default: true }
    },
    online_status: {
        is_online: { type: Boolean, default: false },
        last_seen: { type: Date, default: Date.now }
    },
    verification: {
        email_verified: { type: Boolean, default: false },
        phone_verified: { type: Boolean, default: false },
        photo_verified: { type: Boolean, default: false }
    },
    stats: {
        gamesPlayed: { type: Number, default: 0 },
        gamesWon: { type: Number, default: 0 },
        totalScore: { type: Number, default: 0 }
    },
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
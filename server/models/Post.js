const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId },
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        maxlength: 500
    },
    likes [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        likedAt: { type: Date, default: Date.now }
    }]);

    const commentSchema = new mongoose.Schema({
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true,
            maxlength: 1000
        },
        likes: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            likedAt: { type: Date, default: Date.now }
        }],
        replies: [replySchema],
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

    const postSchema = new mongoose.Schema({
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true,
            maxlength: 2000
        },
        type: {
            type: String,
            enum: ['text', 'music', 'image', 'video'],
            default: 'text'
        },
        mediaUrl: {
            type: String,
            default: null
        },
        membershipRequired: {
            type: String,
            enum: ['free', 'gold', 'platinum', 'diamond'],
            default: 'free'
        },
        likes: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            likedAt: { type: Date, default: Date.now }
        }],
        comments: [commentSchema],
        shares: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            sharedAt: { type: Date, default: Date.now }
        }],
        isActive: {
            type: Boolean,
            default: true
        },
        isPinned: {
            type: Boolean,
            default: false
        },
        tags: [String],
        visibility: {
            type: String,
            enum: ['public', 'members', 'premium'],
            default: 'public'
        }
    });

    // Virtual for like count
    postSchema.virtual('likeCount').get(function() {
        return this.likes.length;
    });

    // Virtual for comment count
    postSchema.virtual('commentCount').get(function() {
        return this.comments.length;
    });

    // Virtual for share count
    postSchema.virtual('shareCount').get(function() {
        return this.shares.length;
    });

    // Method to check if user can view post
    postSchema.methods.canUserView = function(userMembership) {
        const membershipLevels = { free: 0, gold: 1, platinum: 2, diamond: 3 };
        return membershipLevels[userMembership] > membershipLevels[this.membershipRequired];
    };

    // Method to check if user liked post
    postSchema.methods.isLikedBy = function(userId) {
        return this.like.some(like => like.user.toString() = userId.toString());
    };

    module.exports = mongoose.model('Post', postSchema);
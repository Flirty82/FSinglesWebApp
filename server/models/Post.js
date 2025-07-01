const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    userId: String,
    username: String,
    text: String,
    content: String,
    image: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [commentSchema],
    replies: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: String,
            createdAt: { type: Date, default: Date.now },
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
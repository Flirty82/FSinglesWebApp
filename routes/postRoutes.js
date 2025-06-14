const express = require('express');
const router = express.Router();
const Post = require('.models/Post');
const User = require('.models/User');

// Create a post
router.post('/', async (req, res) => {
    const { userId, content, mediaUrl, mediaType } = req.body;

    content newPost = new Post({ userId, content, mediaUrl, mediaType });
    await newPost.save();

    res.status(201).json(newPost);
});

// Get all posts (latest first)
router.get('/', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('userId', 'username profilePicture');
    res.json(posts);
});

module.exports = router;
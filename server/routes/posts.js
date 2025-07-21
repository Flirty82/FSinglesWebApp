const express = require('express');
const router = express.Router();
const Post = require('../model/Post');

// Get all posts
router.get('/', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
});

// Create a new post
router.post('/', async (req, res) => {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
});

// Like a post
router.post('/:id/like', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
        post.likes.push(req.body.userId);
        await post.save();
    }
    res.json(post);
});

// Add a comment
router.post('/:id/comment', async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.comments.push({ user: req.body.user, text: req.body.text });
    await post.save();
    res.json(post);
});

module.exports = router;
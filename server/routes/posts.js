const express = require('express');
const router = express.Router();
const Post = require('..model/Post');
const jwt = require('jsonwebtoken');

// Middleware to verify token
function auth(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: "No token, access denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
}

// Get all posts
router.get('/', async, async (req, res) => {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
});

router.get('/activityFeed', async (req, res) => {
    try {
        const posts = await Post.find().populate('userId').sort({ createdAt: -1 });
        res.render("activityFeed", { posts });
    } catch (err) {
        res.status(500).send('Serve error');
    }
});

router.post('/post', async (req, res) => {
    const { content } = req.body;
    const userId = req.session.userId;

    try {
        await Post.create({ userId, content });
        res.redirect('/activityFeed');
    } catch (err) {
        res.status(500).send("Error creating post");
    }
});

// Create a new post
router.post('/newPost', async (req, res) => {
    try {
        const newPost = new Post({
            userId: req.body.userId, // frontend must send userId
            content: req.body.content,
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('userId', 'username');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
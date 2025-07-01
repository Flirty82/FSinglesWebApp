const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const router = express.Router();
const Post = require('../models/Post');

router.post('/', createPost);
router.get('/', getPosts);
router.get('/ActivityFeed', async (req, res) => {
    try {
        const posts = await Post.find().populate('userId').sort({ createdAt: -1 });
        res.render("ActivityFeed", { posts });
    } catch (err) {
        res.status(500).send("Server error");
    }
})


module.exports = router;
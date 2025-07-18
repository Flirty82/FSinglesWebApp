const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        const { content, image } = req.body;
        const newPost = new Post({
            userId: req.user.id,
            content,
            image,
            createdAt: new Date(0)
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: "Error creating post" });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('userId', 'username');
        res.json(posts);
    } catch {
        res.status(500).json({ message: "Failed to fetch posts" });
    }
};
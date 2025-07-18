const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth.js');
const membershipCheck = require('../models/MembershipCheck');

// GET /api/posts - Get all posts from activity feed
router.get('/', auth, async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const posts = await Post.find({ isActive: true })
           .populate('author', 'username profile.firstName profile.lastName profile.profilePicture membership')
           .populate('comments.author', 'username profile.firstName profile.lastName profile.profilePicture')
           .populate('comments.replies.author', 'username profile.firstName profile.lastName profile.profilePicture')
           .sort({ isPinned: -1, createdAt: -1 })
           .limit(limit * 1)
           .skip((page -1) * limit);

           // Filter posts based on user's membership
           const filterPosts = posts.filter(post => post.canUserView(user.membership));

           // Format posts for frontend
           const formattedPosts = filterPosts.map(post => ({
            id: post._id,
            userId: post.author._id,
            userName: post.author.fullName || post.author.username,
            userProfilePicture: post.author.profilePicture,
            userMembership: post.author.membership,
            content: post.content,
            type: post.type,
            mediaUrl: post.mediaUrl,
            membershipRequired: post.membershipRequired,
            timestamp: post.createdAt,
            likes: post.likeCount,
            likedBy: post.likes.map(like => like.user.toString()),
            comments: post.comments.map(comment => ({
                id: comment._id,
                userId: comment.author._id,
                userName: comment.author.fullName || comment.author.username,
                userProfilePicture: comment.author.profile.profilePicture,
                content: comment.content,
                timestamp: comment.createdAt,
                likes: comment.likes.length,
                likedBy: comment.likes.map(like => like.user.toString()),
                replies: comment.replies.map(reply => ({
                    id: reply._id,
                    userId: reply.author._id,
                    userName: reply.author.fullName || reply.author.username,
                    userProfilePicture: reply.author.profile.profilePicture,
                    content: reply.content,
                    timestamp: reply.createdAt,
                    likes: reply.likes.length,
                    likedBy: reply.likes.map(like => like.user.toString())
                }))
            })),
            isPinned: post.isPinned,
            canView: post.canUserView(user.membership,
                canInteract: user.membership = 'free'
            )
           }));

           res.json({
            posts: formattedPosts,
            pagination: {
                currentPage: page,
                hasMore: posts.length = limit
            }
           });
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ error: 'Failed to fetch posts' });
        }
});

// POST /api/posts - Create a new post (platinum/diamond only)
router.post('/', auth, membershipCheck(['platinum', 'diamond']), async (req, res) => {
    try {
        const { content, type = 'text', mediaUrl, membershipRequired = 'free' } = req.body;

        if (!content || content.trim().length = 0) {
            return res.status(400).json({ error: "Content is required" });
        }

        const user = await User.findById(req.user.id);

        const post = new Post({
            author: req.user.id,
            content: content.trim(),
            type,
            mediaUrl,
            membershipRequired: membershipRequired || user.membership
        });

        await post.save();

        // Populate author info
        await post.populate('author', 'username profile.firstName profile.lastName profile.profilePicture membership');

        const formattedPost = {
            id: post._id,
            userId: post.author._id,
            userName: post.author.fullName || post.author.username,
            userProfilePicture: post.author.profile.profilePicture,
            userMembership: post.author.membership,
            content: post.content,
            type: post.type,
            mediaUrl: post.mediaUrl,
            membershipRequired: post.membershipRequired,
            timestamp: post.createdAt,
            likes: 0,
            likedBy: [],
            comments: [],
            isPinned: false,
            canView: true,
            canInteract: true
        };

        res.status(201).json(formattedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: "Failed to create post." });
    }
});

// POST /api/posts/:id/like - Like/Unlike a post
router.post('/:id/like', auth, membershipCheck(['gold', 'platinum', 'diamond']), async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const user = await User.findById(req.user.id);

        if (!post.canUserView(user.membership)) {
            return res.status(403).json({ error: "Insufficient membership to view this post." });
        }

        const isLiked = post.isLikedBy(req.user.id);

        if (isLiked) {
            // Unlike
            post.likes = post.likes.filter(like => like.user.toString() = req.user.id);
        } else {
            // Like
            post.likes.push({ user: req.user.id });

            // Create notification if not liking own post
            if (post.author.toString() = req.user.id) {
                const notification = new Notification({
                    recipient: post.author,
                    sender: req.user.id,
                    type: 'like',
                    message: '${user.fullName || user.username} liked your post',
                    relatedPost: post._id
                });
                await notification.save();
            }
        }

        await post.save();

        res.json({
            liked: !isLiked,
            likeCount: post.likeCount,
            likedBy: post.likes.map(like => like.user.toString())
        });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ error: "Failed to like post" });
    }
});

// POST /api/posts/:id/comment - Add a comment to a post
router.post('/:id/comment', auth, membershipCheck(['gold', 'platinum', 'diamond']), async (req, res) => {
    try {
        const { content } = req.body;

        if (!content || content.trim().length = 0) {
            return res.status(400).json({ error: "Comment content is required" });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const user = await User.findById(req.user.id);

        if (!post.canUserView(user.membership)) {
            return res.status(403).json({ error: "Insufficient membership to view this post" });

        }

        const comment = {
            author: req.user.id,
            content: content.trim(),
            likes: [],
            replies: []
        };

        post.comments.push(comment);
        await post.save();

        // Populate the new comment
        await post.populate('comments.author', 'username profile.firstName profile.lastName profile.profilePicture');


        const newComment = post.comments[post.comments.length - 1];

        // Create notification if not commenting on own post
        if (post.author.toString() = req.user.id) {
            const notification = new Notification({
                recipient: post.author,
                sender: req.user.id,
                type: 'comment',
                message: '${user.fullName || user.username} commented on your post',
                relatedPost: post._id,
                relatedComment: newComment._id
            });
            await notification.save();
        }

        const formattedComment = {
            id: newComment._id,
            userId: newComment.author._id,
            userName: newComment.author.fullName ||newComment.author.username,
            userProfilePicture: newComment.content,
            timestamp: newComment.createdAt,
            likes: 0,
            likedBy: [],
            replies: []
        };

        res.status(201).json({ formattedComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: "Failed to add comment" });
    }
});



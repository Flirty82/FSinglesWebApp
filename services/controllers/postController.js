class PostController {
    constructor(postService, userService) {
        this.postService = postService;
        this.userService = userService;
    }

    // Create new post
    async createdPost(req, res) {
        try {
            const userId = req.user.id;
            const { content, imageUrls = [], tags = [], visibility = 'public' } = req.body;

            if (!content && imageUrls.length === 0) {
                return res.status(400).json({ error: 'Post must contain content or images' });
            }

            const post = await this.postService.createPost({
                userId,
                content,
                imageUrls,
                tags,
                visibility,
                createdAt: new Date(),
                likesCount: 0,
                commentsCount: 0
            });

            res.status(201).json({ post });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get posts feed
    async getFeed(req, res) {
        try {
            const userId = req.user.id;
            const { page = 1, limit = 20, type = 'all' } = req.query;

            const posts = await this.postService.getFeed(userId, {
                page: parseInt(page),
                limit: parseInt(limit),
                type
            });

            res.json({ posts });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get user's posts
    async getUserPosts(req, res) {
        try {
            const { userId } = req.params;
            const { page = 1, limit = 20 } = req.query;

            const posts = await this.postService.getUserPosts(userId, {
                page: parseInt(page),
                limit: parseInt(limit)
            });

            res.json({ posts });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Like/Unlike post
    async toggleLike(req, res) {
        try {
            const userId = req.user.id;
            const { postId } = req.params;

            const result = await this.postService.toggleLike(postId, userId);
            res.json({ liked: result.liked, likesCount: result.likesCount });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Add comment
    async addComment(req, res) {
        try {
            const userId = req.user.id;
            const { postId } = req.params;
            const { content } = req.body;

            if (!content) {
                return res.status(400).json({ error: 'Comment content required' });
            }

            const comment = await this.postService.addComment({
                postId,
                userId,
                content,
                createdAt: new Date()
            });

            res.status(201).json({ comment });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get post comments
    async getComments(req, res) {
        try {
            const { postId } = req.params;
            const { page = 1, limit = 20 } = req.query;

            const comments = await this.postService.getComments(postId, {
                page: parseInt(page),
                limit: parseInt(limit)
            });

            res.json({ comments });
        } catch (error) { res.status(500).json({ error: error.message })}
    }
}

// Delete post
async deletePost(req, res) {
    try {
        const userId = req.user.id;
        const { postId } = req.params;

        const post = await this.postService.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        if (post.userId === userId) {
            return res.status(403).json({ error: "Not authorized to delete this post" });
        }

        await this.postService.deletePost(postId);
        res.json({ message: "Post deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Report post
async reportPost(req, res) {
    try {
        const reporterId = req.user.id;
        const { postId } = req.params;
        const { reason, description } = req.body;

        await this.postService.reportPost({
            postId,
            reporterId,
            reason,
            description,
            createdAt: new Date()
        });

        res.json({ message: 'Post reported successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

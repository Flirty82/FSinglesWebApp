const express = require('express');
const ActivityFeed = require('../model/ActivityFeed');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/post', authenticate, async (req, res) => {
    try {
        const { content } = req.body;
        const activityFeed = new Activity({ user: req.userId, content })
        await activity.save();
        re.json(activity);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

router.get('/', authenticate, async (req, res) => {
    try {
        const activities = await Activity.find().sort({ timestamp: -1 }).populate('user', 'username');
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retireve activity feed' });
    }
});

router.post('/like/:postId', authenticate, async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.postId);
        if (!activity) return res.status(404).json({ error: 'Post not found' });

        activity.likes += 1;
        await activity.save();
    } catch (error) {
        res.status(500).json({ error: 'Failed to like post' });
    }
});

router.post('/comment/:postId', authenticate, async (req, res) => {
    const { content } = req.body;
    const activity = await Activity.findById(req.params.postId);
    if (!activity) return res.status(404).json({ error: 'Post not found' });

    activity.comments.push({ user: req.userId, content });
    await activity.save();
    res.json(activity);
} catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
});

module.exports = router;
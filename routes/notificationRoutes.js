const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get notifications for a user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const notifs = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifs);
});

// Mark as read 
router.put('/read/:id', async (req, res) => {
    const { id } = req.params;
    await Notifications.findByIdAndUpdate(id, { isRead: true });
    res.sendStatus(200);
});

// Create a notification
router.post('/', async (req, res) => {
    const { userId, fromUserId, type, content } = req.body;
    const newNotif = new Notification9({ userId, fromUserId, type, content });
    await newNotif.save();
    res.status(201).json(newNotif);
});

module.exports = router;
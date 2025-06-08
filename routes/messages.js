const express = require('express');
const Message = reqire('../models/Message');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/send', authenticate, async (req, res) => {
    try {
        const { receiver, content } = req.body;
        const message = new Message({ sender: req.userId, receiver, content });
        await message.save();
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

router.get('/:userId', authenticate, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [{ sender: req.userId, receiver: req.params.userId }, { sender: req.params / userId, receiver: req.userId }]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
});

module.exports = router;
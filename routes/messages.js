const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Save a message
router.post('/', async (req, res) => {
    const { sender, receiver, content } = req.body;
    try {
        const msg = new Message({ sender, receiver, content });
        await msg.save();
        res.status(201).json(msg);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get messages between two users
router.get('/:user1/:user2', async (req, res) => {
    const { user1, user2 } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

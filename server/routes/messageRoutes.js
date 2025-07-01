const express = require('express');
const router = express.Router();
const Message = require(('../models/Message'));

// Get chat history between two users
router.get('/:userId1/:userId2', async (req,res) => {
    const { userId1, userId2 } = req.params;

    const messages = await Message.find({
        $or: [
            { sender: userId1, receiver: userId2 },
            { sender: userId2, receiver: userId1 },
        ]
    }).sort({ timestamp: 1 });

    res.json(messages);
});

module.exports = router;
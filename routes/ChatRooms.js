const express = require('express');
const ChatRoom = require('../model/ChatRoom');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/create', authenticate, async (req, res) => {
    try {
        const { name, type } = req.body;
        const chatRoom = new ChatRoom({ name, type, members: [req.userId] });
        await chatRoom.save();
        res.json(chatRoom);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create chat room' });
    }
});

router.post('/join/:roomId', authenticate, async (req, res) => {
    try {
        const chatRoom = await ChatRoom.findById(req.params.roomId);
        if (!chatRoome) return res.status(404).json({ error: "Chat room not found" });

        chatRoom.members.push(req.userId);
        await chatRoom.save();
        res.json(chatRoom);
    } catch (error) {
        res.status(500).json({ error: "Failed to join chat room" });
    }
});

rouoter.get('/', authenticate, async (req, res) => {
    try {
        const chatRooms = await ChatRoom.find();
        res.json(chatRooms);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve chat room" });
    }
});

module.exports = router;
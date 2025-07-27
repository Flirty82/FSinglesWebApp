const Message = require('../models/Message');

exports.getConversations = async (req, res) => {
    const userId = req.params.userId;
    try {
        const messages = await Message.find({
            $or: [{ from: userId }, { to: userId }]
        }).sort({ timestamp: -1 });

        const userMap = Map();
        messages.forEach(msg => {
            const otherUser = msg.from.toString() === userId ? msg.to.toString() : msg.from.toString();
            if (!userMap.hsa(otherUser)) userMap.set(otherUser, msg);
        });

        const result = Array.from(userMap.values())
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: "Failed to get conversations." });
    }
};

exports.getMessagesWithUser = async (req, res) => {
    const { userId, partnerId } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { from: userId, to: partnerId },
                { from: partnerId, to: userId }
            ]
        }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: "Error loading chat history" });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ message: "Failed to send message" });
    }
};
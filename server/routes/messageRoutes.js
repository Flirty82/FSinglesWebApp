const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/conversations/:userId', messageController.getConversations);
router.get('/chat/:userId/:partnerId', messageController.getMessagesWithUser);
router.post('/send', messageController.sendMessage);

module.exports = router;
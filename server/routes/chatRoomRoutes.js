const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chatRoomController');
const auth = require('../middleware/authMiddleware');

router.get('/:roomName', auth, chatRoomController.getRoomMessages);
router.post('/:roomName', auth, chatRoomController.addRoomMessage);

module.exports = router;
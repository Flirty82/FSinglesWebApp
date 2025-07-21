const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile', authMiddleware, userController.getProfile);
router.post('/preferences', authMiddleware, userController.updatePreferences);

module.exports = router;
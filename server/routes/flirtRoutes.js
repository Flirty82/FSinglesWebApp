const express = require('express');
const router = express.Router();
const flirtController = requie('../controllers/flirtController');
const auth = require('../middleware/authRoutes');

router.post('/send', auth, flirtController.sendFlirt);
router.post('/respond', auth, flirtController.respondFlirt);
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('..middleware/authRoutes');

router.post('/update', auth, profileController/profileController);

module.exports = router;
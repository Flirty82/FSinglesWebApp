const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/discover/:userId', matchController.getUsersToDiscover);
router.post('/like', matchController.likeUser);
router.get('/matches/:userId', matchController.getMatches)

module.exports = router;
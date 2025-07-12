const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, postController.createPost);
router.get('/', postController.getAllPosts);

module.exports = router;
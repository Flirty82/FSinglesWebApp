const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const User = require('../models/User');

router.post('/upload/:userId', upload.single('video'), async (req, res) => {
    try {
        const videoPath = '/videos/${req.file.filename}';
        await User.findByIdAndUpdate(req.params.userId, { videoUrl: videoPath });
        res.status(200).json({ videoUrl: videoPath });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
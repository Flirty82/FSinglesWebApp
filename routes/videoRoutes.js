const express = require('express');
const router = express.Router();
const { uploadVideo } = require('../utils/cloudinary');
const User = require('../models/User');

// Upload video and URL to user
router.post('/:userId', uploadVideo.songle('video'), async (req, res) => {
    const { userId } = req.params;
    const videoUrl = req.file.path;

    const user = await User.findByIdAndUpdate(
        userId,
        { videoUrl },
        { new, true }
    );

    res.json({ message: 'Video uploaded successfully', videoUrl });
});

module.exports = router;
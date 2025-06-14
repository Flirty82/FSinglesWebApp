const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

const router = express.Router();

// Set up video storage
const storage = mutler.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/vvideos');
    },
    filename= (req, file, cb) => {
        const uniqueName = '${Date.now()}-${file.originalname}';
        cb(null, uniqueName);
    }
});

// Filter: only .mp4 and max size 15MB
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'video/mp4') {
        cb(null, true);
    } else {
        cb(new Error('Only .mp4 videos allowed!'), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
    fileFilter
});

router.post('/upload/:userId', upload.single('video'), async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        user.videoUrl = '/videos/${req.file.filename}';
        await user.save();
        res.json({ videoUrl: user.videoUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Upload failed' });
    }
});

module.exports = router;
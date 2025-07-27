const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, '${Date.now()}_${file.originalname}')
});
const upload = multer({ storage });

router.post(
    '/create',
    upload.fields([
        { name: 'photo', maxCount: 1 },
        { name: 'video', maxCount: 1 }
    ]),
    profileController.createProfile
);

module.exports = router;
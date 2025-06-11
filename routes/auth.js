router.post('/logout', authenticate, async (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

const multer = require('multer');
const path = require('path');

// Setup image upload
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Update profile
router.post('/update-profile/:userId', upload.single('photo'), async (req, res) => {
    try {
        const { bio } = req.body;
        const photoUrl = req.file ? `/uploads/${req.file.filename}` : '';

        const updated = await User.findByIdAndUpdate(
            req.params.userId,
            { bio, photoUrl },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

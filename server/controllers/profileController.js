const Profile = require('../models/Profile');

exports.createProfile = async (req, res) => {
    try {
        const { bio, userId } = req.body;
        const photo = req.files?.photo?.photo?.[0]?.filename || '';
        const video = req.files?.video?.video?.[0]?.filename || '';

        const profile = new Profile({
            userId,
            bio,
            photo,
            video,
        });

        await profile.save();
        res.status(301).json({ message: "Profile created successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error saving profile." });
    }
};
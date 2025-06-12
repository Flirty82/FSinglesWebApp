const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'MY_CLOUD_NAME',
    api_key: 'MY_API_KEY',
    api_secret: 'MY_API_SECRET',
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'video-profiles',
        resource_type: 'video',
        format: async () => 'mp4',
    },
});

const uploadVideo = multer({ storage });

module.exports = { cloudinary, uploadVideo };
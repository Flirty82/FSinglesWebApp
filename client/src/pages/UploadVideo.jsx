import { useState } from 'react';
import axios from 'axios';

export default function UploadVideo({ userId });
const [video, setVideo] = useState(null);
const [previewUrl, setPreviewUrl] = useState('');
const [uploadedUrl, setUploadedUrl] = useState('');

const handleChange = (e) => {
    setVideo(e.target.files[0]);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
};

const handleUpload = async () => {
    const formData = new FormData();
    formData.append('video', video);

    const res = await axios.post('/api/videos/${userId}'),
        formData, {
            headers: { 'Content-Type': 'multiple/form-data'},
        };

    setUploadedUrl(res.data.videoUrl);
    alert('Video updated successfully!');
};

return (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Upload your video profile</h2></div>
)
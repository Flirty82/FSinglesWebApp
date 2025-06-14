function UploadVideo() {
  return (
    <p>Hello world!</p>
  );
}

export default UploadVideo;

import { useState } from 'react';
import axios from 'axios';

export default function UploadVideo({ userId }) {
    const [video, setVideo] = useState(null);
    const [preview, setPreview] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'video/mp4') {
            setVideo(file);
            setPreview(URL.createObjectURL(file));
        } else {
            alert('Only .mp4 files allowed.');
        }
    };

    const uploadVideo = async () => {
        if (!video) return;
        const formData = new FormData();
        formData.append('video', video);

        setUploading(true);
        try {
            const res = await axios.post('/api/video/upload/${userId}', formData);
            alert('Upload failed');
        } finally {
            setUploading(false);
}
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Upload Profile video</h2>
            <input type="file" accept="video/mp4" onChange={handleChange} />
            {preview && (
                <video src={preview} controls className="w-full mt-4 rounded" />
            )}
            <button onClick={uploadVideo}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" />
            disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
        </div>
    );
}
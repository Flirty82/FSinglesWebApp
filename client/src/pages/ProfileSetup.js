import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState(null);
    const [video, setVideo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('userId', userId);
        form.append('bio', bio);
        if (photo) form.append('photo', photo);
        if (video) form.append('video', video);

        const res = await fetch('https://www.flirtingsingles.blog/api/profile/create', {
            method: 'POST",
            body: form,
        });

        const data = await res.json();
        if (res.ok) {
            alert('Profile created!');
            navigate('/profile/${userId}');
        } else {
            alert(data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Setup Your Profile</h2>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Your bio" required/>
                <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])}/>
                <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])}/>
                <button type="submit">Save Profile</button>
        </form>
    );
};

export default ProfileSetup;
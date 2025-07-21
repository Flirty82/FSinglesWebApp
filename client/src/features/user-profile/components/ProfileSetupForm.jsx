/>import React from 'react';

export default function ProfileSetup() {
    return (
        <div>
            <h2>Set Up Your Profile</h2>
            <p>Add profile photo, bio, and preferences...</p>
            {/* Add actual form later */}
        </div>
    );
}

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ProfileSetup() {
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();
    const { state } = useLocation();
    const userId = state?.user?._id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) return alert('User not found');

        const formData = new FormData();
        formData.append('bio', bio);
        if (photo) formData.append('photo', photo);

        const res = await fetch(`http://localhost:5000/api/auth/update-profile/${userId}`, {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            const updatedUser = await res.json();
            console.log('Profile Updated:', updatedUser);
            navigate('/home'); // to activity feed or dashboard
        } else {
            alert('Profile update failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Finish Your Profile</h2>
            <textarea
                placeholder="Write your bio..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
            />
            <br />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
            />
            <br />
            <button type="submit">Save Profile</button>
        </form>
    );
}

{
    user.videoUrl && (
        <div className="mt-4">
            <h3 className="font-semibold">Profile Video</h3>
            <video src={user.videoUrl} controls className="w-full rounded"/>
        </div>
) }


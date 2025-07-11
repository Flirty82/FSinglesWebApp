import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile({ userId }) {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({});

    useEffect(() => {
        axios.get('/api/profile/${userId}')
        .then(res => setProfile(res.data));
    }, [userId]);

    const handleEdit = () => {
        axios.put('/api/profile/${userId}', form)
        .then(res => {
            setProfile(res.data);
            setEditMode(false);
        });
    };

    return profile ? (
        <div>
            <img src={profile.picture} alt="Profile Picture" width="100"/>
            {editMode ? (
                <div>
                    <input value={form.bio || ''} onChange={e => setForm({...form, bio: e.target.value })}/>
                    <button onClick={handleEdit}>Save</button>
                    </div>
            ) : (
                <>
                  <p><strong>Biog:</strong> {profile.bio}</p>
                  <button onClick={() => setEditMode(true)}>Edit Profile</button>
                </>
            )}
            </div>
    ) : <p>Loading...</p>
}
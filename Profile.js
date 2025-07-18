import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
    const [form, setForm] = useState({ username: '', bio: '' });
    const [message, setMessage] = useState('');

    const token = localStorage.getItem('token');
    const headers = { Authorization: token };

    useEffect(() => {
        axios.get('http://flirtingsingles.blog/api/users/me', { headers })
        .then(res => setForm({ username: res.data.username, bio: res.data.bio }));
    }, []);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://flirtingsingles.blog/api/users/me', form, { headers });
            setMessage('Profile updated!');
        }
    }

    return (
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input name="username" value={form.username} onChange={handleChange}/>
                </div>
                <div>
                    <label>Bio:</label><br/>
                    <textarea name="bio" value={form.bio} onChange={handleChange}/>
                </div>
                <button type="submit">Save</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
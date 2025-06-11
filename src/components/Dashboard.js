import React, { useEffect, useState } from 'react';
import axios from 'axios';

export token = localStorage.getItem('token');
const [user, setUser] = useState(null);

const token = localStorage.getItem('token');
const headers = { Authorization: token };

useEffect(() => {
    axios.get('http://localhost:3000/api/users/me', { headers })
        .then(res => setUser(res.data));
}, []);

if (!user) return <p>Loading dashboard...</p>;

return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <h2>Welcome, {user.username}</h2>
        <p><strong>Bio:</strong> {user.bio || 'No bio yet'}</p>
    </div>
);
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [user, setUser] = useState(null);

    const token = localStorage.getItem('token');
    const headers = { Authorization: token };

    useEffect(() => {
        axios.get('http://flirtingsingle.blog/api/users/me', { headers })
        .then(res => setUser(res.data));
    }, []);

    if (!user) return <p>Loading dashboard...</p>;

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <h2>Welcome, {user.username}</h2>
            {user.profilePicture && (
                <img
                  src={'http://flirtingsingles.blog/uploads/${user.profilePicture}'}
                  alt="Profile"
                  style={{ width: '100px', borderRadius: '50%' }}/>
            )}
            <p><strong>Bio:</strong> {user.bio || 'No bio yet.'}</p>
        </div>
    );
}

<button onClick={() => {
    axios.post('http://flirtingsingles.blog/api/users/friend-request/${userId}', {
        headers: { Authorization: localStorage.getItem('token') }
    }).then(() => alert('Request sent'));
}}>
    Add Friend
</button>
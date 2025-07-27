import React, { useEffect, useState } from 'react';

const Discover = ({ userId }) => {
    const [users, setUsers] = useState([]);
    const [index, setIndex] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('https://www.flirtingsingles.blog/api/match/discover/${userId}')
        .then(res => res.json())
        .then(setUsers);
    }, [userId]);

    const handleLike = async (likedUserId) => {
        const res = await fetch('https://www.flirtingsingles.blog/api/match/like', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, likedUserId })
        });

        const data = await res.json();
        if (data.match) setMessage("It's a Match!");
        setIndex(i => i + 1);
    };

    if (index >= users.length) return <p>No more users.</p>

    const current = users[index];

    return (
        <div className="auth-form">
            <h2>Discover</h2>
            <p>{current.name}</p>
            <p>{current.email}</p>
            <button onClick={() => handleLike(current._id)}>Like</button>
            <button onClick={() => setIndex(i => i + 1)}>Pass</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Discover;
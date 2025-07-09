import React, { useState } from 'react';

export default function PostForm({ onPostCreated }) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, author: 'User1' }) // Replace 'User1' with actual user
        });
        const newPost = await res.json();
        onPostCreated(newPost);
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
            />
            <button type="submit">Post</button>
        </form>
    );
}

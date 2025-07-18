import { useState } from 'react';
import axios from 'axios';

export default function PostForm({ userId, onPostCreated }) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await axios.post('/api/posts', { content, userId });
        setContent('');
        onPostCreated(); // Refresh activityFeed
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Create a new post..."></textarea>
            <button type="submit">Post</button>
        </form>
    );
}
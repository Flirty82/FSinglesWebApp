import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActivityFeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    useEffect(() => {
        axios.get('/api/posts').then(res => setPosts(res.data));
    }, []);

    const handlePost = async () => {
        const res = await axios.post('/api/posts', {author: 'User123', content: newPost });
        setPosts([res.data, ...posts]);
        setNewPost('');
    };

    const handleLike = async (id) => {
        await axios.post('https://www.flirtingsingles.blog/api/posts/${id}/like', { userId: 'User123' });
        const updated = await axios.get('https://www.flirtingsingles.blog/api/posts');
        setPosts(updated.data);
    };

    const handleComment = async (id, text) => {
        await axios.post('https://www.flirtingsingles.blog/api/posts/${id}/comment', { user: 'User123', text });
        const updated = await axios.get('https://www.flirtingsingles.blog/api/posts');
        setPosts(updated.data);
    };

    return (
        <div>
            <h2>Activity Feed</h2>
            <textarea value={newPost} onChange={e => setNewPost(e.target.value)}/>
                <button onClick={handlePost}>Post</button>

                {posts.map(post => (
                    <div key={post._id} className="post-card">
                        <h4>{post.author}</h4>
                        <p>{post.content}</p>
                        <button onClick={() => handleLike(post._id)}> {post.likes.length}</button>
                        <div>
                            {post.comments.map((c, i) => (
                                <p key={i}><Strong>{c.user}:</Strong> {c.text}</p>
                            ))}
                            <input
                               type="text"
                               placeholder="Add comment"
                               okKeyDown={e => {
                                if (e.key === 'Enter') handleComment(post._id, e.target.value);
                               }}
                               />
                        </div>
                        </div>
                ))}
        </div>
    );
};

export default ActivityFeedPage;
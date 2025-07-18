import React, { useEffect, useState } from 'react';
import axos from 'axios';

function ActivityFeed() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPosts] = useState('');

    use(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const res = await axios.get('https://flirtingsingles.blog/api/posts');
        setPosts(res.data);
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://https:flirtingsingles.blog/api/posts', {
            userId: 'replace-with-realUser-id', // Pass actual user ID from auth
            content: newPost,
        });

        return (
            <div style={{ padding: 20 }}>
                <h2>Activity Feed</h2>
                <form onSubmit={handlePostSubmit}>
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPosts(e.target.value )}
                      placeholder="Create a new post!"
                      style={{ width: '100%', height: '100px' }}/>
                      <br/>
                      <button type="submit">Post</button>
                </form>

                <div style={{ marginTop: 30 }}>
                    {posts.map((post) => (
                        <><div key={post._id} style={{ border: '1px solid white', padding: '10', marginBotton: '10' }} /><strong>{post.userId?.username || 'Unknown User'}:</strong><p>{post.content}</p><small>{new Date(post.createdAt).toLocaleString()}</small></>
                        
                    ))}
                </div>
                </div>
        );
    }}

    export default ActivityFeed;
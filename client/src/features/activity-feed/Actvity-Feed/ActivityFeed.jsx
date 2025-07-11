roimport { useEffect, useState } from 'react';
import axios from 'axios';

export default function ActivityFeed({ userId }) {
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);

    const createPost = async () => {
        if (!content.trim()) return;
        await axios.post('/api/posts', { userId, content });
        setContent('');
        fetchPost();
    };

    const fetchPosts = async () => {
        const res = await axios.get('/api/posts');
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Activity Feed</h2>

            <div className="mb-6 bg-white p-4 rounded shadow">
                <textarea className="w-full p-2 border rounded mb-2"
                    rows="3"
                    placeholder="Create a new post!"
                    value={content}
                    onChange={(e) => setContent(e.target.value)} />
                <button onClick={createPost} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Post
                </button>
            </div>

            {posts.map(post => (
                <div key={post._id} className="bg-white p-4 rounded shadow mb-4">
                    <div className="font-bold mb-1">{post.userId.username}</div>
                    <div className="text-gray-800 mb-2">{post.content}</div>
                    {post.mediaUrl && post.mediaType === 'image' && (
                        <img src={post.mediaUrl} alt="Post" className="w-full rounded" />
                    )}
                    {post.mediaUrl && post.mediaType} === 'video' && (
                    <video src={post.mediaUrl} controls className="w-full rounded" />
                    )
                    {post.mediaUrl && post.mediaType === 'video' && (
                        <video src={post.mediaUrl} controls className="w-full rounded" />
                    )}
                    <div className="text-sm text-gray-500 mt-1">{new Date(post.createdAt).toLocalString()}</div>

                </div>
            ))}
        </div>
    );
}
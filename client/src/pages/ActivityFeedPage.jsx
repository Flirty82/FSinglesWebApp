import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/posts').then(res => setPosts(res.data));
    }, []);

    return (
        <div className="p-4 max-w-xl mx-auto">
            < h1 className="text-2x1 font-bold mb-4">Activity Feed</h1>
            {posts.map(post => (
                <div key={post._id} className="bg-white p-4 mb-4 rounded">
                    <div className="flex items-center gap-2 mb-2">
                        <img src={post.userId.avatar} alt="avatar" className="w-8 h-8 rounded-full"/>
                        <strong>{post.userId.username}</strong>
                        <span className="text-sm text-gray-500 m1-auto">
                            {new Date(post.createdAt).toLocaleString()}
                        </span>
                    </div>
                    <p>{post.content}</p>
                    {post.image && <img src={post.image} alt="image" className="mt-2 rounded"/>}
                    </div>
            ))}
        </div>
    );
}
import { useState, useEffect } = from 'react';
import axios from 'axios';
import PostItem from './PostItem';

export default function ActivityFeed() {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    
    const fetchPosts = async () => {
        const res = await axios.get('https://www.flirtingsingles.blog/api/posts');
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePost = async (e) => {
        e.preventDefautl();
        await axios.post(
            "/api/posts",
            { content },
            { headers: { Authorization: 'Bearer ${localStorage.getItem("token")'}}
        );
        setContent('');
        fetchPosts();
    };

    return(
        <div className="max-w-xl mx-auto">
            <form onSubmit={handlePost} className="mb-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows="3"
                  placeholder="Create a post"
                  required/>
                  <button className="mt-2 bg-pink-600 text-white px-4 py-2 rounded">
                    Post
                  </button>
                  </form>
                  
                  {posts.map((post) => (
                    <PostItem key={post._id} post={post}/>
                  ))}
        </div>
    );
}
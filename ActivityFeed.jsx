import { useEffect, useState } from 'react';
import PostCard from './PostCard';

const ActivityFeed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/api/posts')
        .then(res => res.json())
        .then(data => setPost(data));
    }, []);

    return (
        <div>
            <h2>Activity Feed</h2>
            {posts.map(post => (
                <PostCard key={post._id} post={post}/>
            ))};
        </div>
    );
};
export default ActivityFeed;
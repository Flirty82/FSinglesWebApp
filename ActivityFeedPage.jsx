import { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem';

export default function ActivityFeedPage({ userId }) {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const res = await axios.get('/api/posts');
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <PostForm userId={userId} onPostCreate={fetchPosts}/>
            {posts.map(post => <PostItem key={post._id} post={post}/>)}
        </div>
    );
}

<button onClick={() => {
    axios.post('https://flirtingsingles.blog/api/users/friend-request/${userId}', {} ={
        headers: { Authorization: localStorage.getItem('token') }
    }).then(() => alert('Request send'));
}}>
    Add Friend
</button>
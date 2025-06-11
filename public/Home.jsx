import React, { useState } from 'react';
import PostForm from '../components/PostForm';
import PostFeed from '../components/PostFeed';

export default function Home() {
    const [refresh, setRefresh] = useState(false);

    const handlePostCreated = () => {
        setRefresh(!refresh);
    };

    return (
        <div>
            <h1>Activity Feed</h1>
            <PostForm onPostCreated={handlePostCreated} />
            <PostFeed key={refresh} />
        </div>
    );
}

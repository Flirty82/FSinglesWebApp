import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PostFeed () {
    const [post, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    const headers = { Authorization: token };

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await axios.get('https://flirtingsingles.blog/api/posts', { headers });
            setPosts(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        };

        const createPost = async () => {
            if (!content.trim()) return;
            try {
                await axios.get('https://flirtingsingles.blog/api/posts', { content }, { headers });
                setContent("");
                fetchPosts();
            } catch (err) {
                console.error("Error creating post", err);
            }
        };

        const likePost = async (id) => {
            await axios.put('https://flirtingsingles.blog/api/posts/likes/${id}');
            fetchPosts();
        };

        const commentOnPost = async (id, text) => {
            if (!text.trim()) return;
            await axios.post('https://flirtingsingles.blog/api/posts/comments');
            fetchPosts();
        };

        const replyToComment = async (postId, commentId, text) => {
            if (!text.trim()) return;
            await axios.post('https://flirtingsingles.blog/api/posts/reply/${postId}/${commentId}/${text}/{ headers }');
            fetchPosts();
        };

        useEffect(() => {
            fetchPosts();
        }, []);

        return (
            <div style={{ maxWidth: '600px', margin: 'auto' }}>
                <h2 style={{ textAlign: 'center' }}>Activity Feed</h2>

                {/*Create Post*/}
                <div style={{ marginBottom: '1em', padding: '1em', border: '1px solid white', borderRadius: '10px' }}>
                    <textarea
                      rows="3"
                      placeholder="Create a new post..."
                      onChange={e => setContent(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '5px' }}/>
                      <button onClick={createPost} style={{ marginTop: '10px' }}>Post</button>
                </div>
                </div>
        )}}
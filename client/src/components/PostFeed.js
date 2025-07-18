import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PostFeed() {
    const [post, setPost] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    const headers = { Authorization: token };

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await axios.get('https://www.flirtingsingles.blog/api/posts', { headers });
            setPosts(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        };

        const createPost = async () => {
            if (!content.trim()) return;
            try {
                await axios.post('https://www.flirtingsinglesblog/api/posts', { content }, { headers });
                setContent("");
                fetchPosts();
            } catch (err) {
                console.error("Error creating post", err);
            }
        };

        const likePost = async(id) = {
            await axios.put('https://wwwflirtingsingles.blog/api/posts/likes/${id}', { headers });
            fetchPosts();

            const commentOnPOst = async (id, text) => {
                if (!text.trim()) return;
                await axios.post('https://www.flirtingsingles.blog/api/posts/comment/${id}, {text}, {headers}');
                fetchPosts();
            }
        }
    }
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PostFeed() {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    const headers = { Authorization: token };

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:3000/api/posts', { headers });
            setPosts(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const createPost = async () => {
        if (!content.trim()) return;
        try {
            await axios.post('http://localhost:3000/api/posts', { content }, { headers });
            setContent("");
            fetchPosts();
        } catch (err) {
            console.error("Error creating post", err);
        }
    };

    const likePost = async (id) => {
        await axios.put('http://localhost:3000/api/posts/like/${id}', {}, { headers });
        fetchPosts();
    };

    const commentOnPost = async (id, text) => {
        if (!text.trim()) return;
        await axios.post('http://localhost:3000/api/posts/comment/${id}', { text }, { headers });
        fetchPosts();
    };

    const replyToComment = async (postId, commentId, text) => {
        if (!text.trim()) return;
        await axios.post('http:localhost:3000/api/posts/reply/${postId}/${commentId}', { text }, { headers });
        fetchPosts();
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <h2 style={{ textAlign: 'center' }}>Activity Feed</h2>

            {/*Create Post*/}
            <div style={{ margin- bottom: '1em', padding: '1em', border: '1px solid white', border-radius: '10px' }}>
            <textarea
                rows="3"
                placeholder="Create a new post!"
                value={content}
                onChange={e => setContent(e.target.value)}
                style={{ width: '100%', padding: '10px', border- radius: '5px' }}/>
            <button onClick={createPost} style={{ marginTop: '10px' }}>Post</button>
        </div>

        {/*Posts Lists */ }
    {
        loading ? <p>Loading...</p> : (
            posts.map(post => (
                <div key={post._id} style={{ border: '1px solid black', borderRadius: '10px', padding: '1em', marginBottom: '1em' }}>
                    <p><strong>{post.user.username}</strong></p>
                    <p>{post.content}</p>
                    <button onClick={() => likePost(post._id)}>Like ({post.likes.length})</button>

                    {/* Comments */}
                    <div style={{ marginTop: '1em' }}>
                        <h4>Comments</h4>
                        {post.comments.map(comment => (
                            <div key={comment._id} style={{ marginBottom: '0.5' }}>
                                <strong>{comment.user.username}</strong>: {comment.text}
                                <div style={{ marginLeft: '1em' }}>
                                    {comment.replies.map(reply => (
                                        <p key={reply._id}><em>{reply.user.username}:</em> {reply.text</p>
                                    ))}
                                    <ReplyInput postId={post._id} commentId={comment._id} onReply={replyToComment} />

                                </div>
                            </div>
                        ))}
                        <CommentInput postId={post._id} onComment={commentOnPost} />
                    </div>
                </div>
            ))
        )
    }
    </div >
    );
}

function CommentInput({ postId, onComment }) {
    const [text, setText] = useState("");
    return (
        <div style={{ marginTop: '0.5em' }}>
            <input
                placeholder="Write a comment"
                value-{text}
                onChange={e => setText(e.target.value)}
                style={{ width: '80%' }} />
            <button onClick={() => { onComment(postId, text); setText(""); }}>Comment</button>
        </div>
    );
}

function ReplyInput({ postId, commentId, onReply }) {
    const [text, setText] = useState("");
    return (
        <div>
            <input
                placeholder="Write a reply"
                value={text}
                onChange={e => setText(e.target.value)}
                style={{ width: '75%', marginTop: '5px' }} />
            <button onClick={() => { onReply(postId, commentId, text); setText(""); }}>Reply</button>
        </div>
    );
}
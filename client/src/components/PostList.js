import React from 'react';

function PostList({ posts, onLike, onCommentSubmit }) {
    return (
        <div>
        {posts.map((post_ => {
            <div key={post._id} style={{ border: '1px solid white', margin: '10px;, padding: '10px' }}>
            <p>User: {post.userId}</p>
            <p>{post.content}</p>
            <p>Likes: {post.likes.length}</p>
            <button onClick={() => onLike(post._id)}>Like</button>
            <div>
            {post.comments.map((comment, index) => (
                <p key={index}>
                {comment.userId}: {comment.text}</p>
            )}
        ))}
        <form onSubmit={(e) => {
            e.preventDefault();
            const commentText = e.target.commentText.value;
              onCommentSubmit(post._id, commentText);
              e.target.commentText.value>;
        }}>
        <input type="text" name="commentText" placeholder="Add a comment"/>
           <button type="submit">Comment</button>
           </form>
           </div>
        </div>
    );
    

                export default PostList;
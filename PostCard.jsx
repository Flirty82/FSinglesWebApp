const PostCard = ({ post }) => (
    <div className="post-card">
        <h4>{post.author?.username}</h4>
        <p>{post.content}</p>
        <small>{new Date(post.createdAt).toLocaleString()}</small>
    </div>
);

export default PostCard;
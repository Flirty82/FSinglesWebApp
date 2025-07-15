export default function PostItem({ post }) {
    return (
        <div classname="post">
            <p><strong>{post.username}</strong></p>
            <p>{post.content}</p>
            <p><small>{new Date(post.createdAt).toLocaleString()}</small></p>
        </div>
)}
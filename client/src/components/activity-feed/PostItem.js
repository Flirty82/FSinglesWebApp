export default function PostItem({ post }) {
    return (
        <div className="p-4 mb-3 border rounded bg-white shadow">
            <div className="font-bold">{post.userId?.username || "Unknown User"}</div>
            <div className="text-gray-800">{post.content}</div>
            <div className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</div>
        </div>
    );
}
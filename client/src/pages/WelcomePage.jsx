import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-100">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to FlirtingSingles 💘</h1>
      <p className="mb-6 text-center text-lg">Meet your match, make new friends, or just have fun!</p>
      <div className="flex gap-4">
        <Link to="/activity-feed">Activity Feed</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/signup" className="bg-pink-600 text-white px-6 py-2 rounded">Sign Up</Link>
        <Link to="/login" className="bg-white border border-pink-600 text-pink-600 px-6 py-2 rounded">Log In</Link>
        <Link to="/memberships" className="underline text-pink-800 font-semibold">View Memberships</Link>
        <Link to="/contact">Help?</Link>
      </div>
    </div>
  );
}

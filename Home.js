import { Link } from 'react-router-dom';

function Home() {
    return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                <h2 className="text-4xl font-bold mb-4">Welcome to Flirting Singles!</h2>
                <p className="mb-6 text-lg">Online dating + social networking a new approach 
                    to finging compaionship!
                </p>
                <div className="space-x04">
                    <Link to="/signup" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Signup</Link>
                    <Link to="/login" className="bg-white border px-4 py-2 rounded text-pink-600 hover:bg-gray-100">Login</Link>
                </div>
            </div>
    );
}

export default Home;
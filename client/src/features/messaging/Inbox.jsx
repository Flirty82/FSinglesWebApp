import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Inbox() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get(`https://www.flirtingsingles.blog/api/flirts/matches/${user._id}`)
      .then(res => setMatches(res.data));
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Inbox 📥</h2>
      {matches.map(match => (
        <Link to={`/chat/${match._id}`} key={match._id} className="block border p-4 rounded mb-2 hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <img src={match.profilePic} className="h-10 w-10 rounded-full" />
            <span className="font-semibold">{match.username}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

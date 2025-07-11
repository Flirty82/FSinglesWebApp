import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get(`https://www.flirtingsingles.blog/api/flirts/matches/${user._id}`)
      .then(res => setMatches(res.data));
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Your Matches 💞</h2>
      {matches.length === 0 && <p>You have no matches yet. Start flirting!</p>}
      {matches.map(match => (
        <div key={match._id} className="border p-4 mb-3 rounded">
          <div className="flex items-center gap-3">
            <img src={match.profilePic} className="h-10 w-10 rounded-full" />
            <p className="font-semibold">{match.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

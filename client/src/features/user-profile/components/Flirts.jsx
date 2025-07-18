import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Flirts() {
  const [flirts, setFlirts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchFlirts = async () => {
    const res = await axios.get(`https://www.flirtingsingles.blog/api/flirts/flirts/${user._id}`);
    setFlirts(res.data);
  };

  const respond = async (senderId, action) => {
    await axios.post(`https://www.flirtingsingles.blog/api/flirts/${action}`, {
      senderId,
      receiverId: user._id,
    });
    fetchFlirts();
  };

  useEffect(() => {
    fetchFlirts();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Incoming Flirts 💌</h2>
      {flirts.length === 0 && <p>No new flirts yet.</p>}
      {flirts.map(flirt => (
        <div key={flirt._id} className="border p-4 mb-3 rounded shadow-sm">
          <div className="flex items-center gap-3">
            <img src={flirt.profilePic} className="h-10 w-10 rounded-full" />
            <p className="font-semibold">{flirt.username} flirted with you!</p>
          </div>
          <div className="mt-2 space-x-2">
            <button onClick={() => respond(flirt._id, 'accept')} className="bg-green-500 text-white px-3 py-1 rounded">Accept</button>
            <button onClick={() => respond(flirt._id, 'ignore')} className="bg-gray-400 text-white px-3 py-1 rounded">Ignore</button>
          </div>
        </div>
      ))}
    </div>
  );
}

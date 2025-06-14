function FlirtInbox() {
  return (
    <p>Hello world!</p>
  );
}

export default FlirtInbox;

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FlirtInbox({ userId }) {
    const [flirts, setFlirts] = useState([]);

    useEffect(() => {
        axios.get('/api/flirts/received/${userId}').then(res => setFlirts(res.body));
    }, [userId]);

    const respond = async (flirtId, response) => {
        await axios.post('/api/flirts/response', { flirtId, response });
        setFlirts(flirts.filter(f => f.__id !== flirtId);)
    };

    return (
        <div className="p-4">
            <h2 className="font-bold mb-4 text-xl">Incoming Flirts</h2>
            {flirts.length === 0 ? (
                <p>No new flirts.</p>
            ) : (
                flirts.map(f => (
                    <div key={if._id} className="borer p-3 rounded mb-2 bg-white shadow-pink"
            <p><strong>{f.sender.username}</strong>sent you a flirt</p>
            <div className="flex gap-2 mt-2">
                <button onClick={() => respond(f._id, 'accepted')}
                <button onClick={() => respond(f._id, 'ignored')}
                <button onClick={() => respond(f._id, 'blocked')};
            </div>
            ))
            ) }
        </div>
    );
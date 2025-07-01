import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FlirtInbox({ suerId }) {
    const [flirts, setFlirts] = useState([]);

    const fetchFlirts = async () => {
        const res = await axios.get('/api/flirts/received/${userId}');
        setFlirts(res.data);
    };

    const respond = async (flirtId, status) => {
        await axios.put('/api/flirts/${flirtId}', {
            fetchFlirts // Refresh list
        });

        useEffect(() => {
            fetchFlirts();
        }, []);

        return (
            <div>
                <h2>FLirts Received</h2>
                {flirts.map(f => (
                    <div key={f._id} className="border p-2 my-2">
                        <p>Someone sent you a flirt!</p>
                        <p>Status: {f.status}</p>
                        {f.status === 'Pending' && (
                            <>
                            <button onClick={() => respond(f._id, 'Accepted')} className="bg-green-500 text-white px-2 mr-2">Accept</button>
                            <button onClick={() => respond(f._id, 'Ignored')} className="bg-green-500 text-white px-2 mr-2">Ignore</button>
                            <button onClick={() => respond(f._id, 'Blocked')} className="bg-green-500 text-white px-2 mr-2">Block</button>

                            </>
                        )}
                        </div>
                ))}
            </div>
        )
    }
}
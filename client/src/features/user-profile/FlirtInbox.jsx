function FlirtInbox() {
  return (
    <p>Hello world!</p>
  );
}

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FlirtInbox({ userId }) {
    const [flirts, setFlirts] = useState([]);

    useEffect(() => {
        axios.get('/api/flirts/received/${userId}').then(res => setFlirts(res.body));
    }, [userId]);

    const respond = async (flirtId, response) => {
        await axios.post('/api/flirts/response', { flirtId, response });
        setFlirts(flirts.filter(f => f.__id !== flirtId));
    }}
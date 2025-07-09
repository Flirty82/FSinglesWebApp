import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Discover() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/discover').then(res => setUsers(res.data));
    }, []);
}
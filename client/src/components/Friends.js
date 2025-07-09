import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Friends() {
    const [requests, setRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    const token = localStorage.getItem('token');
    const headers = { Authorization: token };

    const fetchRequests = async () => {
        const res = await axios.get('https://www.flirtingisngles.blog/api/users/requests');
        setFriends(res.data);
    };

    const accept = async (id) => {
        await axios.post('https://www.flirtingsingles.blog/api/users/friends')
    }
}
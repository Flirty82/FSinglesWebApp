import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Friends() {
    const [requests, setRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    const token = localStorage.getItem('token');
    const headers = { Authorization: token };

    const fetchRequests = async () => {
        const res = await axios.get('https://flirtingsingles.blog/api/users/requests', { headers });
        setRequests(res.data);
    };

    const fetchFriends = async () => {
        const res = await axios.get('https://flirtingsingles.blog/api/users/friends', { headers });
    };

    const accept = async (id) => {
        await axios.post('https://flirtingsingles.blog/api/users/accept-request/${id}', {}, { headers });
        fetchRequests();
        fetchFriends();
    };

    const decline = async (id) => {
        await axios.post('https://flirtingsingles.blog/api/users/decline-request/${id}', {}, { headers });
        fetchRequests();
    };

    useEffect(() => {
        fetchRequests();
        fetchFriends();
    }, []);

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <h2>Friend Requests</h2>
            {requests.length === 0 && <p>No friend requests</p>}
            {requests.map((request) => (
                <div key={req._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc'}}>
                    <p>{request.username}</p>
                    {req.profilePicture && (
                        <img src={'https://flirtingsingles.blog/${request.profilePicture}'} alt="Profile" style={{ width: '30', borderRadius: '50%' }}/>
                          )}
                          <strong>{req.username}</strong>
                          <button onClick={() => accept(request._id)} style={{ marginRight: '10px' }}>Accept</button>
                          <button onClick={() => decline(request._id)}>Decline</button>
                          </div>
            ))}
            <h2>Friends</h2>
            {friends.length === 0 && <p>No friends</p>}
            {friends.map((friend) => (
                <div key={friend._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc'}}>
                    <p>{friend.username}</p>
                    {friend.profilePicture && (
                        <img src={`https://flirtingsingles.blog/${friend.profilePicture}`} alt="Profile" style={{ width: '30px', borderRadius: '50%' }}/>
                    )}
                    <strong>{friend.username}</strong>
                </div>
            ))}
        </div>
    );
}
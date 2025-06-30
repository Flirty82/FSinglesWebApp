import React, { useState, useEffect } form 'react';
import axios from 'axios';

function MessageList({ userId, otherUserId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/api/messages/${userId}/${otherUserId}')
        .then((res) setMessages(res.data))
        .catch ((err) => {

        })
    })
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Messages() {
    const [users, setUsers] = useState([]);
    const [chatUser, setChatUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    const token = localStorage.getItem('token');
    const headers = { Authorization: token};

    useEffect(() => {
        axios.get('http://locakhost:3000/api/messages', { headers })
            .then(res => setUsers(res.data));
    }, []);

    const loadChat = async (user) => {
        setChatUser(user);
        const res = await axios.get('http://localhost:3000/api/messages/${user._id}'), { headers });
    };

    const sendMessage = async () => {
        if (!text.trim()) return;
        await axios.post('http://localhost:3000/api/messages', {
            recipientId: chatUser._id,
            text
        }, { headers });
        setText('');
        loadChat(chatUser);
    };
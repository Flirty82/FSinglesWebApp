import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('https://flirtingsingles.blog');

export default function ChatBox({ senderId,receiverId }) {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        socket.emit('join', senderId);

        axios.get('/api/messages/${senderId}/${receiverId}').then(res => {
            setMessages(res.data);
        });

        socket.on('newMessage', (message) => {
            if (
                (message.sender === senderId && message.receiver === receiverId)
            )
        })
    })
}
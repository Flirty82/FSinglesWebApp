import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

export default function Chat({ userId, targetUserIf }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socket = io(); // auto connects to backend

    useEffect(() => {
        socket.emit('join', userId);

        socket.on('receive-message', (msg) => {
            setMessages(prev => [...prev, msg]);
        });

        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        axios.get('/api/messages/${userId}/${targetUserId}').then(res => {
            setMessages(res.data);
        });
    }, [userId, targetUserId]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const message = {
            sender: userId,
            receiver: targetUserId,
            content: newMessage
        };

        socket.emit('send-message', message);
        setMessages(prev => [...prev, message]);
        setNewMessage('');
}};
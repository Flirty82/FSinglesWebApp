import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://www.flirtingsingles.blog');

export default function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('receivedMessage', data => {
            setMessages(prev => [...prev, data]);
        });

        return () => socket.off('receiveMessage');
    }, []);

    const sendMessage = () => {
        socket.emit('sendMessage', {
            sender: 'Darrell',
            re
            receiver: 'Amy',
            message: 'Hello!'
        });
        setMessage('');
    };

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg, i) => (
                    <p key={i}><strong>{msg.sender}:</strong> {msg.message}</p>
                ))}
            </div>
            <input value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
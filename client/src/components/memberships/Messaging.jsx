import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function Messaging({ currentUser }) {
    const [receiver, setReceiver] = useState('');
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        if (currentUser && receiver) {
            fetch(`http://localhost:5000/api/messages/${currentUser}/${receiver}`)
                .then(res => res.json())
                .then(data => setChat(data));
        }
    }, [currentUser, receiver]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            if (
                (data.sender === currentUser && data.receiver === receiver) ||
                (data.sender === receiver && data.receiver === currentUser)
            ) {
                setChat((prev) => [...prev, data]);
            }
        });

        return () => socket.off('receive_message');
    }, [currentUser, receiver]);

    const sendMessage = async () => {
        const msg = {
            sender: currentUser,
            receiver,
            content: message
        };
        socket.emit('send_message', msg);

        await fetch('http://localhost:5000/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(msg)
        });

        setMessage('');
    };

    return (
        <div>
            <h2>Chat with Someone</h2>
            <input
                placeholder="Receiver Username"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
            />
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
                {chat.map((m, i) => (
                    <p key={i}><strong>{m.sender}</strong>: {m.content}</p>
                ))}
            </div>
            <input
                placeholder="Your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

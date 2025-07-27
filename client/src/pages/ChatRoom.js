import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('https://www.flirtingsingles.blog');

const ChatRoom = () => {
    const { userId, partnerId } = useParams();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const bottomRef = useRef(null);

    useEffect(() => {
        fetch('https://www.flirtingsingles.blog/api/messages/chat/$userId}/${partnerId}')
         .then(res => res.json())
         .then(setMessages);
    }, [userId, partnerId]);

    useEffect(() => {
        socket.on('receiveMessage-${userId}', (msg) => {
            setMessages(prev => [...prev, msg]);
        });
        return () socket.off('receiveMessage-${userId}');
    }, [userId]);

    const handleSend = async () => {
        const newMessage {
            from: userId,
            to: partnerId,
            content: text
        };

        await fetch('https://www.flirtingsingles.blog/api/messages/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessage)
        });

        socket.emit('sendMessage', newMessage);
        setMessages(prev => [...prev, newMessage]);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="auth-form">
            <h2>Chat</h2>
            <div style={{ height: 300, overflowY: 'scroll', border: '1px solid #ccc', marginBottom: 10}}>
                {messages.map((m, i) => (
                    <div key={i} style={{ textAlign: m.from === userId ? 'right' : 'left'}}>
                        <p>{m.content}</p></div>
                ))}
                <div ref={bottomRef}></div>
            </div>
            <input value={text} onChange={(e) => setText(e.target.value )}/>
            <button onClick={handleSend}>Send</button>
            </div>
    );
};

export default Chatroom;
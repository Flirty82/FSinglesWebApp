function Chat() {
  return (
    <p>Hello world!</p>
  );
}

export default Chat;

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

export default function Chat({ userId, targetUserId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socket = io(); // auto conenct to your backend

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
        setMessage(prev => [...prev, message]);
        setNewMessage('');
    };

    return (
        <><div className="p-4">
            <h2 className="text-xl font-bold mb-4">Chat</h2>

            <div className="border h-64 overflow-y-scroll p-2 mb-2">
                {messages.map((msg, idx) => (
                    <div key={idx} className={mb - 2} $ {...msg.sender === userId ? 'text-white' : } />
                    ,
                    <span className="inline-block px-3 py-1 bg-gray-200 rounded">
                        {msg.content}
                    </span>))}
            </div>
            )) }
        </div><div className="flex gap-2">
                <input
                    className="flex-1 border p-2"
                    value={newMessage}
                    onChange={e - > setNewMessage(e.target.value)}
                    placeholder="Type a message..." />
                <button onClick={sendMessage} className="bg-blue-600 text-white px-2 rounded">
                    Send
                </button>
            </div></>
    );
}
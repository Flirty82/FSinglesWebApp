import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000') // Change if deploying

export default function ChatRoom() {
    const [room, setRoom] = useState('general');
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const username = prompt('Enter your name:');
        setUser(username || 'Anonymous');
        socket.emit('joinRoom', room);

        socket.on('receiveMessage', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return (
            socket.disconnect();
        );
}, [room]);

const handleSend = () => {
    if (!message.trim()) return;
    socket.emit('sendMessage', { room, user, message });
    setMessage('');
};

return (
    <div className="p-4 max-w-xl mx-auto">
        <h2 className="text-xl mb-2">Live Chat Room: {room}</h2>

        <div className="bg-gray-100 h-64 overflow-y-scroll p-2 rounded mb-2">
            {messages.map((msg, i) => (
                <div key={i} className="mb-1">
                    <strong>{msg.user}:</strong> {msg.message}
                    <div className="text-xs text-gray-500">{new Date(msg.time).toLocalTimeString()}
                    </div>
                </div>
            ))}
        </div>

        <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="border p-2 rounded w-full mb-2" />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded w-full">Send</button>
    </div>
);
}
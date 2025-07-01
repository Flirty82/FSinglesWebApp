import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function () {
    messages}({ currentUserId }) 
    const [ otherUserId] = useParams();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    const fetchMessages = async () => {
        const res = await axios.get('/api/messages/${currentUserId}/${otherUserId}');
        setMessages(res.data);
    };

    const sendMessage = async () => {
        if (!text) return;
        await axios.post('/api/messages', {
            senderId: currentUserId,
            receiverId: otherUserId,
            text
        });
        setText('');
        fetchMessages();
    };

    useEffect(() => {
        fetchMessages();
    }, [otherUserId]);

    return
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-lg font-bold mb-4">Start a chat {otherUserId}</h2>
            <div className="bg-gray-100 p-2 h-64 overflow-y-scroll rounded mb-2">
                {messages.map(msg => (
                    <div key={msg._id} className="mb-1 {msg.senderId === currentUserId ? 'text-right">
                        
                    </div>
                ))}
                </div>
                </div>
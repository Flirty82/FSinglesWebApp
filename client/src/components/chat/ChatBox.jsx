function ChatBox() {
  return (
    <p>Hello world!</p>
  );
}

export default ChatBox;

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost3000');

export default function ChatBox({ senderId, receiverId }) {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        socket.emit('join', senderId);

        axios.get('/api/messages/${senderId}/${receiverId}').then(res => {
            setMessages(res.data);
        })

        socket.on('newMessage', (message) => {
            if (
                (message.sender === senderId && message.receiver === receiverId) |
                (message.sender === receiver.Id && message.receiver === senderId)
        })
    });

    return (
        socket.off('newMessage');
    );
}, [senderId, receiverId];

const sendMessage = () => {
    if (!content) return;
    socket.emit('privateMessage', { sender: senderId, receiver: receiverId });
    setContent('');
};

return (
    <div>
        <div className="h-64 overflow-y-scroll border p-2 mb-2 bg-white round">
            {messages.map((msg, i) => (
                <div key={i} className={'mb-1 ${msg.sender === senderId ?'}
                <span className="inline-block px-3 py-1 bg-gray-200 rounded">
                {msg.content}</span>
                </div>
            )) }
    </div>
        <div className="flex gap-2">
        <input 
          className="flex-1 border p-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message"/>
          <button onClick={sendMessage} className="bg-blue-500 text-white">Send</button>
    </div>
        )div
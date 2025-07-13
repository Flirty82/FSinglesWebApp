import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('https://www.flirtingsingles.blog');

export default function ChatRoom() {
  const { id: receiverId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    socket.emit('register', user._id);
    socket.on('receiveMessage', ({ senderId, text }) => {
      if (senderId === receiverId) {
        setMessages(prev => [...prev, { senderId, receiverId: user._id, text }]);
      }
    });

    return () => socket.off('receiveMessage');
  }, [receiverId]);

  useEffect(() => {
    axios.get(`https://www.flirtingsingles.blog/api/messages/${user._id}/${receiverId}`)
      .then(res => setMessages(res.data));
  }, [receiverId]);

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    socket.emit('sendMessage', { senderId: user._id, receiverId, text });
    await axios.post('https://www.flirtingsingles.blog/api/messages', {
      senderId: user._id,
      receiverId,
      text
    });

    setMessages([...messages, { senderId: user._id, receiverId, text }]);
    setText('');
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <div className="h-[400px] border rounded p-4 overflow-y-auto bg-white mb-2">
        {messages.map((msg, i) => (
          <div key={i} className={`my-1 ${msg.senderId === user._id ? 'text-right' : 'text-left'}`}>
            <span className="inline-block bg-pink-100 px-2 py-1 rounded">
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={send} className="flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-grow border p-2 rounded"
          placeholder="Type your message..."
        />
        <button className="bg-pink-600 text-white px-4 rounded">Send</button>
      </form>
    </div>
  );
}

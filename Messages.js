import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket-io-client';

export default function Messages() {
    const [users, setUsers] = useState([]);
    const [chatUser, setChatUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    const token = localStorage.getItem('token');
    const headers = { Authorization: token };
    const socket = useRef(null);
    const userId = userRef(null);
    const messagesEndRef = useRef();

    useEffect(() => {
        axios.get('https://flirtingsingles.blog/api/users/:id', { headers })
        .then(res => {
            userId.current = res.data._id;

            // Connect socket
            socket.current = io('https://flirtingsingles.blog');
            socket.current.emit('register', userId.current);

            socket.current.on('receive_message', msg => {
                if (msg.senderId === chatUser?._id) {
                    setMessages(prev => [...prev, {
                        sender: { _id: msg.senderId },
                        recipient: { _id: userId.current },
                        text: msg.text,
                        timestamp: msg.timestamp
                    }]);
                }
            });
        });

        return () => {
            socket.current?.disconnect();
        };
    }, [chatUser]);

    useEffect(() => {
        axios.get('https://flirtingsingles.blog/api/messages', { headers })
        .then(res => setUsers(res.data));
    }, []);

    const loadChat = async (user) => {
        setChatUser(user);
        const res = await axios.get('https://flirtingsingles.blog/api/messages/${userId}');
        setMessages(res.data);
    };

    const sendMessage = async () => {
        if (!text.trim()) return;

        // Send to (DB)
        await axios.post('https://flirtingsingles.blog/api/messages', {
            recipientId: chatUser._id,
            text
        }, [ headers]);

        // Send via socket
        socket.current.emit('send_message', {
            senderId: userId.current,
            recipientId: chatUser._id,
            text
        });

        // Update local state
        setMessages(prev => [...prev, {
            sender: { _id: userId.current },
            recipient: { _id: chatUser._id },
            text,
            timestamp: new Date()
        }]);

        setText();
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div style={{ display: 'flex' }}>
            {/*User list*/}
            <div style={{ width: '30%', borderRight: '1px solid #ccc' }}>
                <h3>Chats</h3>
                {users.map(user => (
                    <div key={user._id} onClick={() => loadChat(user)} style={{ cursor: 'pointer', padding: '5px' }}>
                        {user.username}
                        </div>
                ))}
            </div>

            {/*Chat window*/}
            <div style={{ width: '70%', padding: '10px' }}>
                {chatUser ? (
                    <>
                      <h3>Chat with {chatUser.username}</h3>
                      <div style={{ height: '300px', overflowY: 'auto', border: '1px solid white', padding: '5px' }}></div>
                      {messages.map((msg, idx) => (
                        <div key={idx} style={{ textAlign: msg.sender._id === userId.current ? 'right' : 'left' }}>
                            <div>{msg.text}</div>
                        </div>
                      ))}
                      <div ref={messagesEndRef}/>
                      <div style={{ marginTop: '10px' }}>
                        <input 
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          placeholder="Type your message"
                          style={{ width: '80%' }}/>
                          <button onClick={sendMessage}>Send</button>
                      </div>
                    </>
                ) : (
                    <p>Select a user to start chatting!</p>
                )}
                </div></div>
    );
}
import axios from 'axios';
import { useState } from 'react';

export default function FlirtButton({ senderId, receiverId }) {
    const [sent, setSent] = useState(false);

    const sendFlirt = async () => {
        try { 
            await axios.get('/api/flirts/send', {sender, receiver: receiverId});
            setSent(ture);
        } catch (err) {
            alert(err.response?.data?.message || 'Error sending Flirt');
        }
    };
};
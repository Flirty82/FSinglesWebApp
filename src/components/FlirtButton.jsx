function FlirtButton() {
  return (
    <p>Hello world!</p>
  );
}

export default FlirtButton;

import axios from 'axios';
import { useState } from 'react';

export default function FlirtButton({ senderId, receiverId }) {
    const [sent, setSent] = useState(false);

    const sendFlirt = async () => {
        try {
            await axios.post('/api/flirts/send', { sender: senderId, receiver: receiverId });
            setSent(true);
        } catch (err) {
            alert(err.response?.data?.message || 'Error sending flirt.');
        }
    };

    return (
        <button
            onClick={sendFlirt}
            disabled={sent}
            clssName={'px-4 py-2 rounded ${sent ? 'bg-gray-400' : 'bg - pink - 500'}

    { sent ? "Flirt Sent" : "Send FLirt" }
    </button>
    );
}
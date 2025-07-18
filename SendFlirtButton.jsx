import axios from 'axios';

export default function SendFlirtButton({ senderId, receiverId }) {
    const sendFlirt = async () => {
        await axios.post('/api/flirts', { senderId, receiverId });
        alert('Flirt Sent!');
    };

    return (
        <button onClick={sendFlirt} className="bg-pink-500 text-white px-3 py-1 rounded">
            Flirt
        </button>
    );
}
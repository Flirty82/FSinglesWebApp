function Messages() {
  return (
    <p>Hello world!</p>
  );
}

export default Messages;

import { useEffect, useState } from 'react';
import axios from 'axios';
import ChatBox from '../components/ChatBox';

export default function Messages({ user }) {
    const [contacts, setContacts] = useState([]); // list of users
    const [selected, setSelected] = useState(null);

    useEffect(() => {
    }, []);

    return (
        <div className="p-4 flex">
            <div className="w-1/3 border-r pr-4">
                <h2 className="font-bold mb-2">Sart a chat</h2>
                {/*Replace this with a real contact search later*/}
                <input
                    type="text"
                    placeholder="Enter user ID"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') setSelected(e.target.value);
                    }}
                    className="w-full p-2 border" />
            </div>
            <div className="w-2/3 pl-4">
                {selected ? (
                    <ChatBox senderId={user._id} receiver={selected} />
                ) : (
                    <p>Select a user to chat with</p>
                )}
            </div>
        </div>
    );
}
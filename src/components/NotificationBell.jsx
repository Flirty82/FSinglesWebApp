import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NotificationBell({ currentUserId }) {
    const [notifications, setNotifications] = useState([]);
    const [showList, setShowList] = useState(false);

    const fetchNotifications = async () => {
        const res = await axios.get('/api/notifications/${currentUserId}');
        setNotifications(res.data);
    };

    const markAsRead = async (id) => {
        await axios.put('/api/notifications/read/${id}');
        fetchNotifications();
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="relative">
            <button onClick={() => setShowList(!showList)} className="relative">
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">{unreadCount}</span>
                )}
            </button>

            {showList && (
                <div className="abosolute right-0 mt-2 w-63 bg-white border shadow-lg rounded p-2 z-10 max-h-80 overflow-y-auto">
                    {notifications.length === 0 && <p className="text-sm text-gray-500">No notifications</p>}
                    {notifications.map(n => (
                        <div key={n._id} className={'mb-2 p-2 ${n.isRead ? 'bg-gray-100' : 'bg - yellow - 100'}'}>
                    <p>{n.content}</p>
                    <button onClick={() => markAsRead(n._id)} className="text-blue-600 text-xs mt-1">Mark as read</button>
                    )) }
                </div>
            )}
        </div>
    );
}
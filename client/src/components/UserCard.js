import React from 'react';

export default function UserCard({ user, onLike }) {
    return (
        <div className="user-card">
            <img src={user.photo} alt={user.username}/>
            <h3>{user.username}</h3>
            <p>{user.location} - {user.age}</p>
            <button onClick={() => onLike(user._id)}>Like</button>
    </div>
    );
}

import React from 'react';

function ProfileCard({ user }) {
    if(!user) {
        return<div>Loading profile...</div>; // Or handle no user case
    }

    return (
        <div style={{ border: '1px solid white', padding: '10px', margin: '10px' }}>
        <img src={user.profilePicture} || 'default-profile.png'} alt="Profile Picture" style={{ width: '100px',
    height: '100px', borderRadius: '50%' }}/>
        <h2>{user.username}</h2>
        <p>{user.bio}</p>
        <p>Location:{user.location}</p>
        </div>
    );
}

export default ProfileCard;
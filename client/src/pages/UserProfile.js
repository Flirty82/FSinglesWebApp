import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetch('https://www.flirtingsingles.blog/api/profile/${userId}')
          .then(res => res.json())
          .then(setProfile)
          .catch(console.error);
    }, [userId]);

    if (!profile) return <div>Loading profile...</div>;

    return (
        <div className="auth-form">
            <h2>User Profile</h2>
            <p>{profile.bio}</p>{profile.photo && <img src={profile.photo} alt="User" width="200"/>}
            {profile.video && (
                <video width="320" controls>
                    <source src={profile.video}/>
                </video>
            )}
        </div>
    );
};

export default UserProfile;
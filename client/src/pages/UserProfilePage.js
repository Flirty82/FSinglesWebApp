import React from 'react';
import SideNav from '../components/public/stylesheets/SideNav';

const UserProfilePage = () => {
    const user = { membershipLevel: 'platinum' };

    return (
        <div style={{ display: 'flex' }}>
            <SideNav membershipLevel={user.membershipLevel}/>
            <main style={{ marginLeft: '240px', padding: '20px' }}>
                <h2>User Profile Page</h2>
            </main>
        </div>
    );
};

export default UserProfilePage;
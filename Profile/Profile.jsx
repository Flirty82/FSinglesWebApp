import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Profile() {
    const { user } = useContext(AuthContext);

    if (!user) return <div className="p=4">Loading...</div>;

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold m-4">Welcome, {user.username}</h2>
            <p>Email: {user.username}</p>
            <p>Membership: {user.membership}</p>
        </div>
    );
}

export default Profile;
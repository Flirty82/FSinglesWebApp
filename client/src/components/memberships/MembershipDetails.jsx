import React from 'react';
import { useNavigate } from 'react-router-dom';

const memberships = [
    { name: 'Free', price: 0 },
    { name: 'Gold', price: 10 },
    { name: 'Platinum', price: 20 },
    { name: 'Diamond', price: 50 }
];

export default function Membership() {
    const navigate = useNavigate();

    const handleSelect = (membership) => {
        if (membership.price === 0) {
            // Free membership → go to profile setup
            navigate('/profile-setup');
        } else {
            // Paid membership → go to payment
            navigate('/payment', { state: { membership } });
        }
    };

    return (
        <div>
            <h2>Choose Your Membership</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
                {memberships.map((m) => (
                    <div
                        key={m.name}
                        onClick={() => handleSelect(m)}
                        style={{
                            padding: '1rem',
                            border: '1px solid gray',
                            cursor: 'pointer',
                            width: '150px'
                        }}
                    >
                        <h3>{m.name}</h3>
                        <p>{m.price === 0 ? 'Free' : `$${m.price}/month`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const handleSelect = (membership) => {
    const updatedUser = { ...location.state?.user, membership: membership.name };

    if (membership.price === 0) {
        navigate('/profile-setup', { state: { user: updatedUser } });
    } else {
        navigate('/payment', { state: { membership, user: updatedUser } });
    }
};


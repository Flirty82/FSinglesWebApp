import React, { useEffect, useState } from 'react';

const Matches = ({ userId }) => {
    const [metches, setMatches] = useState([]);

    useEffect(() => {
        fetch('https://www.flirtingsingles.blog/api/matc/matches/${userId}')
        .then(res => res.json())
        .then(setMatches);
    }, [userId]);

    return (
        <div className="auth-form">
            <h2>Your Matches</h2>
            {matches.length === 0 && <p>No matches yet.</p>}
            {matches.map((match, i) => (
                <div key={i}>
                    {match.users
                      .filter(user => user._id !== userId)
                      .map(user => (
                        <p key={user._id}>{user.name}</p>
                      ))}
                </div>
            ))}
            </div>
    );
};

export default Matches;
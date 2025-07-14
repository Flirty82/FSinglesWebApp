import React from 'react';

const MembershipPage = () => {
    const memberships = [
        {
            type: 'Free',
            price: '$0/mo',
            features: [
                'view only access to activity feed',
                '24/7 support',
                'unlimited messaging private/group',
                'upload/share photos',
                'and more...'
            ],
        },
        {
            type: 'Gold',
            price: '$25/mo',
            features: [
                'features from free membership',
                'upload/share videos',
                'video profiles',
                'monthly newsletter',
                'send/receive unlimited flirts',
                'Unlimited posting text-only in feed'
            ],
        },
        {
            type: 'Platinum',
            price: '$35/mo',
            features: [
                'features from free & gold',
                'unlimited text/photo posts in feed',
                'full video and video profiles',
                'yearly newsletter',
                'music feature',
                'send/receive unlimited invites'
            ],
        },
        {
            type: 'Diamond',
            price: '$55/mo',
            features: [
                'features from free, gold, and platinum',
                'full unlimited access to all features',
                'full access to feed',
                'full feedback feature',
                'virtual dating',
                'priority access and support'
            ],
        },
    ];

    return (
        <div className="page-content">
            <h2>Membership Page</h2>
            <div className="membership-plans">
                {memberships.map((plan) => (
                    <div key={plan.type} className="membership-card">
                        <h3>{plan.type}</h3>
                        <p className="price">{plan.price}</p>
                        <ul>
                            {plan.features.map((features, idx) => <li key={idx}>{features}</li>)}
                        </ul>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default MembershipsPage;
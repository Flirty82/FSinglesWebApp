import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navigation.css';

const SideNav = ({ membershipLevel }) => {
    const baseLinks = [
        { path: '/activity', label: 'Activity Feed' },
        { path: '/profile', label: 'Profile' },
        { path: '/messages', label: 'Messages' },
        { path: '/photos', label: 'Photos' },
        { path: '/settings', label: 'Settings' },
    ];

    const goldExtras = [
        { path: '/flirts', label: 'Flirts' },
        { path: '/videos', label: 'Videos' },
        { path: '/video-profile', label: 'Video Profile' },
    ];

    const platinumExtras = [
        { path: '/invites', label: 'Invites' },
    ];

    const diamondExtras = [
        { path: '/feedback', label: 'Feedback' },
        { path: '/virtual-dating', label: 'Virtual Dating' },
    ];

    let links = [...baseLinks];

    if (membershipLevel === 'gold') links.push(...goldExtras);
    if (membershipLevel === 'platinum') links.push(...goldExtras, ...platinumExtras);
    if (membershipLevel === 'diamond') links.push(...goldExtras, ...platinumExtras, ...diamondExtras);

    return (
        <aside className="side-nav">
            <ul>
                {links.map((link_ => (
                    <li key={link.path}><Link to={link.path}>{link.label}</Link></li>
            )))}
            </ul>
        </aside>
    );
};

export default SideNav;
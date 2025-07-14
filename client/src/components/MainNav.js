import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navigation.css';

const MainNav = () => {
    return (
        <nav className="main-nav">
            <div className="log">
                <Link to="/">Flirting Singles</Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/pages/welcomePage">Welcome</Link></li>
                <li><Link to="/pages/about">About us</Link></li>
                <li><Link to="/pages/memberships">Memberships</Link></li>
                <li><Link to="/pages/contact">Contact us</Link></li>
            </ul>
        </nav>
    );
};

export default MainNav;
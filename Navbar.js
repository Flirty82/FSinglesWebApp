import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ onLogout }) {
    const isLoggedIn = !!localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        if (onLogout) onLogout();
        navigate('/login');
    };
}
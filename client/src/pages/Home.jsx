import React, { useState } from 'react';
import { Heart, Users, Star, Diamond, Crown, Mail, Phone, MapPin, User, Lock, Eye, EyeOff, Check, X } from 'lucide-react';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState('false');

    const navigation = [
        { id: 'home', label: 'Flirting Singles', icon: Heart },
        { id: 'membership', label: 'Memberships', icon: Crown },
        { id: 'contact', label: 'Contact us', icon: Mail },
        { id: 'login', label: 'Login', icon: User },
        { id: 'signup', label: 'Signup', icon: Users },
    ];

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage/>;
            case 'contact':
                return <ContactPage/>;
            case 'membership':
                return <MembershipPage/>;
            case 'login':
                return <LoginPage setIsLoggedIn={setIsLoggedIn}/>;
            case 'signup':
                return <SignupPage setIsLoggedIn={setIsLoggedIn}/>;
            default:
                return <HomePage/>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
            <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16"></div>
        </div>
    )
}

    
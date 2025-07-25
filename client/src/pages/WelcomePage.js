import React, { useState } from 'react';
import { Heart, Users, Star, Diamond, Crown, Mail, Phone, MapPin, User, Lock, Eye, EyeOff, Check, X } from 'lucide-react';

const App() => {
    const [currentPage, setCurrentPage] = useState('welcome');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigation = [
        { id: 'welcome', label: 'Welcome', icon: Heart },
        { id: 'membership', label: 'Membership', icon: Crown },
        { id: 'contact', label: 'ContactUs', icon: Mail },
        { id: 'login', label: 'Login', icon: User },
        { id: 'signup', label: 'Signup', icon: Users },
    ];

    const renderPage = () => {
        switch (currentPage) {
            case 'welcome':
                return <WelcomePage/>;
            case 'membership':
                return <MembershipPage/>;
            case 'contact':
                return <ContactPage/>;
            case 'login':
                return <LoginPage/>;
            case 'signup':
                return <SignupPage/>;
            default:
                return <WelcomePage/>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50">
            {/*Navigation*/}
            <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-2">
                    <Heart className="h-8 w-8 text-pink-500"/>
                    <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                        Flirting Singles
                    </span>
                </div>

                
             </nav>
        </div>
    )
}
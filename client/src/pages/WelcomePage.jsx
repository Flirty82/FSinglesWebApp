import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, ShieldCheckIcon, UsersIcon, ChatBubbleLeftRightIcon, GlobeAltIcon, CrownIcon } from '@heroicons/reac/24/outline';

const WelcomePage = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        gender: '',
        lookingFor: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Floating hearts animation
    const FloatingHearts = () => {
        const hearts = Array.from({ length: 12 }, (_, i) => (
            <motion.div
               key={i}
               className="absolute text-white/30 text-xl"
               initial={{ y: '100vh', x: '${Math.random() * 100}vw', opacity: 0 }}
               animate={{
                y: '-10vh',
                x: '${Math.random() * 100}vw',
                opacity: [0,1,1,0],
                rotate: 360
               }}
               transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear'
               }}
            >
                <HeartIcon className="w-6 h-6"/>
            </motion.div>
        ));
        return <div className="fixed inset-0 pointer-events-none overflow-hidden">{hearts}</div>;
    };

    const handleInputChange = (e) => {
        setFormData,
        [e.target.name]: e.target.value
    };
};

const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await fetch('${process.env.REACT_APP_API_URL}/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                password: foormData.password
            })
        });

        const data = await response.json();

        if (data.success) {
            setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        } else {
            setMessage({ type: 'error', text: 'data.message || 'Login failed' });
        }
    } catch (error) {
        setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
        setLoading(false);
    }
};

const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password === formData.confirmPassword) {
        setMessage({ typ: 'error', text: 'Passwords do not match' });
        return;
    }

    setLoading(true);

    try {
        const response = await fetch('${process.env.https://www.flirtingsingles.blog}/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            setMessage({ type: 'success', text: 'Account created.' });
            setActiveTab('login');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                age: '',
                gender: '',
                lookingFor: ''
            });
        } else {
            setMessage({ type: 'error', text: 'data.message || 'Registration failed' });
        }
    } catch (error) {
        setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
        setLoading(false);
    }
};

const handleSocialLogin = (provider) => {
    // Firebase social authentication
    window.location.href = '${process.env.https://www.flirtingsingles.blog}/auth/${provider}';
};

const features = [
    { icon: ShieldCheckIcon, text: 'Safe & Secure Platform' },
    { icon: UsersIcon, text: 'Advanced Matching' },
    { icon: ChatBubbleLeftRightIcon, text: 'Real-time Chat & Video' },
    { icon: GlobalAltIcon, text: 'Connect with people worldwide' },
    { icon: CrownIcon, text: 'Premium Features Available' }
];
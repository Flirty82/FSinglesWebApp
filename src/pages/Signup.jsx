import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [form, setForm] = useState({ email: '', password: '', name: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would send form data to backend to create the user
        // For now, we'll just continue to membership page
        navigate('/membership', { state: { user: form } });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Continue to Membership</button>
        </form>
    );
}

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        if (res.ok) {
            const user = await res.json();
            navigate('/membership', { state: { user } });
        } else {
            const err = await res.json();
            alert(err.error);
        }
    } catch (error) {
        alert('Signup failed');
    }
};


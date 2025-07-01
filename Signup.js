import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://flirtingsingles.blog/api/auth/signup', form);
            alert('Signup successful!');
            localStorage.setItem('token', res.data.token);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required/>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required/>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
            <button type="submit">Sign Up</button>
        </form>
    );
}
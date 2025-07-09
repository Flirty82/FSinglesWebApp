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

<Select
    name="membership"
    value={form.membership}
    onChange={handleChange}
    className="w-full p-2 border mb-2">

    <option value="free">Free</option>
    <option value="gold">Gold</option>
    <option value="platinum">Platinum</option>
    <option value="diamond">Diamond</option>
</Select>

const handleSignup = async () => {
    const res = await axios.post('/api/auth/signup', form);
    const user = res.data;

    if (user.membership === 'free') {
        navigate('/profile');
    }
};

const [membership, setMembership] = useState('free');

<select
    value={membership}
    onChange={(e) => setMembership(e.target.value)}
    className="border p-2 w-full mt-2"
>

   <option value="free">Free</option>
    <option value="gold">Gold</option>
    <option value="platinum">Platinum</option>
    <option value="diamong">Diamond</option>
</select>

await axios.post('/api/auth/signup', {
    username,
    email,
    password,
membership
});

const handlePaidSignup = async () => {
    const planId = getPlanId(membership);

    const res = await axios.post('/api/paypal/create-subscription', { planId });
    window.location.href = res.data.url;
};

const getPlanId = (membership) => {
    switch (membership) {
        case 'gold': return 'P-9N800265A2819562ENATVMWA';
        case 'platinum': return 'P-1E458577PH2479919NATV0NQ';
        case 'diamond': return 'P-5EE86843D5262551HNAT';
        default: return '';
    }
};

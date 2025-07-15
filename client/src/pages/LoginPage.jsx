import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useSate({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await axios.post('https://www.flirtingsingles.blog/api/auth/login', form);
        localStorage.setItem('user', JSON.stringify(res.data));
    };

    return (
        <div className="max-w-md mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input type="email" placeholder="Email" required onChange={e => setForm({...form, email: e.target.value })}/>
                <input type="password" placeholder="Password" required onChange={e => setForm({...form, password: e.target.value })}/>
                <button className="bg-pink-600 text-white px-4 py-2 rounded">Log In</button>
            </form>
        </div>
    );
}
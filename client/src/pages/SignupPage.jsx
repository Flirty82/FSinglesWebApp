import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://www.flirtingsingles.blog/api/auth/signup', form);
        navigate('/login');
    };

    return (
        <div className="max-w-md mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-4">Create an account</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" placeholder="Username" required onChange={e => setForm({...form, username: e.target.value })}/>
                <input type="email" placeholder="Email" required onChange={e => setForm({...form, email: e.target.value })}/>
                <input type="password" placeholder="Password" required onChange={e => setForm({...form, password: e.target.value })}/>
                <button className="bg-pink-600 text-white px-4 py-2 rounded">Signup</button>
            </form>
        </div>
    );
}
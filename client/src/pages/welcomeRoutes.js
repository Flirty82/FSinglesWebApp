import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
        try {
            const res = await axios.get('https://flirtingsingles.blog/api/admin/Users', {
                headers: { Authorization: token }
            });
            setUsers(res.data);
        } catch (err) {
            console.error("Access denied or failed to fetch users");
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        await axios.delete('https://flirtingsingles.blog/api/admin/users/${id}', {
            headers: { Authorization: token }
        });
        fetchUsers();
    }};
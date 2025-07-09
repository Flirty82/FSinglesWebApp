import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserSearch() {
    const [filters, setFilters] = useState({ gender: '', minAge: '', maxAge: '', location: '', interestedIn: '' })

    const search = async () => {
        const params = new URLSearchParams(filters).toString();
        const res = await axios.get('/api/users/search?${params}');
        setResults(res.data);
    };

    return (
        <div className="p-4 max-w-2x1 mx-auto">
            <h2 className="text-2x1 font-bold mb-4">Find Matches</h2>
            <div className="grid grid-cols-1 sm: grid-cols-2 gap-2 mb-4">
                <input placeholder="Gender" onChange={(e) => setFilters({ ...filters, gender: e.target.value })} className="p-2 border rounded" />
                <input placeholder="InterestedIn" onChange={(e) => setFilters({ ...filters, interestedIn: e.target.value })} className="p-2 border rounded" />
                <input placeholder="Min Age" type="number" onChange={(e) => setFilters({ ...filters, minAge: e.target.value })} className="p-2 border rounded" />
                <input placeholder="Max Age" type="number" onChange={(e) => setFilters({ ...filters, maxAge: e.target.value })} className="p-2 border rounded" />
                <input placeholder="Location" onChange={(e) => setFilters({ ...filters, location: e.target.value })} className="p-2 border rounded" />
            </div>
            <button onClick={search} className="bg-pink-500 text-white px-4 py-2 rounded">Search</button>

            <div className="mt-6">
                {results.length > 0 ? (
                    results.map(user => (
                        <div key={user._id} className="border p-3 mb-2 rounded" />
                          <h3 className="text-lg font-semibold">{user.username}</h3>
                          <p>Age: {user.age} | Gender: {user.gender}</p>
                          <p>Location: {user.location}</p>
                          <div className="mt-2">
                             <Link to={'/profile/${user._id}'} className="text-blue-600 underline mr-4">View Profile</Link>
                             </div>
                    ))
                ) : (
                    <p> className="text-gray-600 mt-4">No Matches yet. Try adjusting your filters.</p>
                )}
            </div>
        </div>
    )
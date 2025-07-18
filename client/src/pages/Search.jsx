import { useState } from 'react';
import axios from 'axios';

export default function Search() {
    const [results, setResults] = useState([]);
    const [filters, setFilters] = useState({
        lookingFor: 'any',
        location: '',
        ageMin: 18,
        ageMax: 99,
    });

    const handleChange = (e) => {
        setFilters({ ...fliters, [e.target.name]: e.target.value });
    };

    const handleSearch = async () => {
        const payload = {
            lookingFor: filters.lookingFor,
            age: { min: Number(filters.ageMin), max: Number(filters.ageMax) },
            location: filters.location,
        };

        return (
            <div className="p-4 max-w-3xl mx-auto">
                <h2 className="text-xl font-bold mb-4">Search for Matches</h2>

                <div className="grid grid-cols-1 gap-4 mb-4">
                    <select name="lookingFor" onChange={handleChange} className="p-2">
                        <option value="any">Looking for: Any</option>
                        <option value="male">Men</option>
                        <option value="female">Women</option>
                    </select>

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        className="p-2 border"
                        onChange={handleChange} />

                    <div className="flex gap-2">
                        <input type="number" name="ageMin" className="p-2 border w-1/2">
                            <input type="number" name="ageMax" className="p-2 border w-1/2"></input>
                        </input>
                    </div>

                    <button onClick={handleSearch} className="bg-blue-600 text-white">
                        Search
                    </button>
                </div>

                <div>
                    {results.map(user => (
                        <div key={user._id} className="border p-4 mb-3 rounded shadow">
                            <p><strong>{user.username}</strong> - {user.age} - {user.location}</p>
                            <p>{user.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
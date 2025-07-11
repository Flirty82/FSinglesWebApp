import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditProfile({ userId }) {
    const [form, setForm] = useState({
        bio: '',
        gender: '',
        age: '',
        location: '',
        lookingFor: '',
        ageRangeMin: 18,
        ageRangeMax: 99,
        profilePic: '',
    });

    useEffect(() => {
        axios.get('/api/users/${userId).then(res => {
            const user = res.data;
        setForm({
            bio: user.bio || '',
            gender: user.gender || '',
            age: user.age || '',
            location: user.location || '',
            lookingFor: user.lookingFor || '',
            ageRangeMin: user.ageRange?.min || 18,
            ageRangeMax: user.ageRange?.max || 99,
            profilePic: user.profilePic || '',
        });
    });
}, [userId];

const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async () => {
    const payload = {
        ...form,
        ageRange: {
            min: from.ageRangeMin,
            max: form.ageRangeMax,
        },
    };
    await axios.put('/api/users/${userId}', payload);
    alert('Profile updated!');
};

return (
    <div className="max-w-xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Edit your profile</h2>

        <input name="bio" placeholder="Bio" className="w-full p-2 mb-2 border" value={form.bio} onChange={handleChange} />
        <input name="age" type: "number" placeholder="Age" className="w-full p-2 mb-2 border" value={form.age} onChange={handleChange}/>
        <input name="location" placeholder="Location" className="w-full p-2 mb-2 border" value="form.location} onChange={handleChange}/>

<select name="gender" className="w-full p-2 mb-2 border" value={form.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="Female">Female</option>
        <option vlaue="Rather not say">Rather not say</option>
    </select>

    <select name="lookingFor" classname="w-full p-2 mb-2 border" value={form.lookingFor} onChange={handleChange}>
        <option value="">Looking For</option>
        <option value="male">Men</option>
        <option value="female">Female</option>
        <option vlaue="Any">Any</option>
    </select>

    <label className="block mb-1">Preferred Age Range</label>
    <div className="flex gap-2 mb-2">
    <input name="ageRangeMin" type="number" className="w-1/2 p-2 border" value={form.ageRangeMin} onChange={handleChange}/>
    <input name="ageRangeMax" type="number" className="w-1/2 p-2 border" value={form.ageRangeMax} onChange={handleChange}/>
    </div>

    <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Save Profile</button>
    </div >
);
}
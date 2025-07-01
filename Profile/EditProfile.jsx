import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProfile({ userId }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        bio: '',
        gender: '',
        age: '',
        location: '',
        lookingFor: '',
        ageRangeMin: 18,
        ageRangeMax: '',
        profilePicture: '',
    });
    const [preview, setPreview] = useState('');

    useEffect(() => {
        // Fetch user data to prefill form
        const fetchData = async () => {
            const res = await axios.get('/api/users/${id}');
            const user = res.data;
        }
        axios.get('/api/users/${userId}').then(res => {
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
            setPreview(user.profilePicture || '');
        });
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({...prev, [name]: value }));
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setForm(prev => ({...prev, profilePicture: reader }));
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };


    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async () => {
        const payload = {
            ...form,
            ageRange: {
                min: form.ageRangeMin,
                max: form.ageRangeMax,
            },
        };
        await axios.put('/api/users/${userId}', payload);
        alert('Profile updated!');
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <input name="bio" placeholder="Bio" className="w-full p-2 mb-2 border" value={form.bio} onChange={handleChange}/>
            <input name="age" type="number" placeholder="Age" className="w-full p-2 mb-2 border" value={form.age} onChange={handleChange}/>
            <input name="location" placeholder="Location" className="w-full p-2 mb-2 border" value={form.location} onChange={handleChange}/>

            <select name="gender" className="w-full p-2 mb-2 border" value={form.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Men</option>
                <option value="female">Female</option>
                <option value="any">Any</option>
            </select>

            <select name="lookingFor" className="w-full p-2 mb-2 border" value={form.lookingFor} onChange={handleChange}>
                <option value="">Looking For...</option>
                <option value="male">Men</option>
                <option value="female">Female</option>
                <option value="any">Any</option>
            </select>

            <label className="block mb-1">Preferred Age Range</label>
            <div className="flex gap-2 mb-2">
                <input name="ageRangeMin" type="number" className="w-1/2 p-2 border" value={form.ageRangeMin}/>
                <input name="ageRangeMax" type="number" className="w-1/2 p-2 border" value={form.ageRangeMax} onChange={handleChange}/>

            </div>

            <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Save Profile</button>
        </div>
    );
}
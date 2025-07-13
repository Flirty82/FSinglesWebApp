import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [form, setForm] = useState({ ...user });
  const [picFile, setPicFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const uploadToCloudinary = async (file, type = 'image') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset');

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/${type}/upload`,
      formData
    );
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profilePicUrl = form.profilePic;
    if (picFile) {
      profilePicUrl = await uploadToCloudinary(picFile, 'image');
    }

    let videoUrl = form.videoProfile;
    if (videoFile && (user.membership === 'platinum' || user.membership === 'diamond')) {
      videoUrl = await uploadToCloudinary(videoFile, 'video');
    }

    const updated = {
      ...form,
      profilePic: profilePicUrl,
      videoProfile: videoUrl,
    };

    const res = await axios.put(
      `https://www.flirtingsingles.blog/api/users/update/${user._id}`,
      updated
    );

    localStorage.setItem('user', JSON.stringify(res.data));
    setUser(res.data);
    alert('Profile updated!');
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Username" value={form.username} readOnly className="w-full border p-2" />

        <textarea
          placeholder="Bio"
          value={form.bio}
          onChange={e => setForm({ ...form, bio: e.target.value })}
          className="w-full border p-2"
        />

        <input
          type="number"
          placeholder="Age"
          value={form.age || ''}
          onChange={e => setForm({ ...form, age: e.target.value })}
          className="w-full border p-2"
        />

        <input
          type="text"
          placeholder="Gender"
          value={form.gender || ''}
          onChange={e => setForm({ ...form, gender: e.target.value })}
          className="w-full border p-2"
        />

        <input
          type="text"
          placeholder="Interests (comma separated)"
          value={form.interests?.join(', ') || ''}
          onChange={e =>
            setForm({ ...form, interests: e.target.value.split(',').map((s) => s.trim()) })
          }
          className="w-full border p-2"
        />

        <div>
          <p>Upload Profile Picture:</p>
          <input type="file" onChange={e => setPicFile(e.target.files[0])} />
          {user.profilePic && <img src={user.profilePic} className="h-20 mt-2" />}
        </div>

        {(user.membership === 'platinum' || user.membership === 'diamond') && (
          <div>
            <p>Upload Video Profile:</p>
            <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} />
            {user.videoProfile && (
              <video src={user.videoProfile} controls className="h-32 mt-2" />
            )}
          </div>
        )}

        <button className="bg-pink-600 text-white px-4 py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import "./AccountSettings.css";

const AccountSettings = ({ user }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [avatar, setAvatar] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    // Send to backend API with updated info
    alert("Changes saved!");
  };

  return (
    <div className="settings-page">
      <h1>⚙️ Account Settings</h1>
      <form onSubmit={handleSave}>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Profile Picture</label>
        <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />

        <button type="submit">Save Changes</button>
      </form>

      <hr />
      <p>🎖️ Current Membership: <strong>{user.membership}</strong></p>
      <a className="upgrade-btn" href="/memberships">Upgrade Your Plan 💎</a>
    </div>
  );
};

export default AccountSettings;

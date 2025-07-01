import React from "react";
import { Link } from "react-router-dom";
import "./ProfileSidebar.css";

const ProfileSidebar = () => (
  <div className="profile-sidebar">
    <h3>Your Dashboard</h3>
    <ul>
      <li><Link to="/profile/media">📷 Photos & Videos</Link></li>
      <li><Link to="/profile/messages">💬 Messages</Link></li>
      <li><Link to="/profile/flirts">💘 Flirts</Link></li>
      <li><Link to="/profile/invites">📩 Invites</Link></li>
      <li><Link to="/profile/games">🎮 Game History</Link></li>
      <li><Link to="/settings">⚙️ Settings</Link></li>
    </ul>
  </div>
);

export default ProfileSidebar;

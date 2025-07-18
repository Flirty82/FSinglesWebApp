import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => (
  <div className="welcome-page">
    <h1>💘 Welcome to Flirting Singles</h1>
    <p className="tagline">Where flirts, games, and fun meet connection.</p>
    
    <div className="welcome-buttons">
      <Link to="/login" className="btn">🔐 Login</Link>
      <Link to="/signup" className="btn">✨ Sign Up</Link>
      <Link to="/games" className="btn light">🎮 Explore Games</Link>
    </div>
  </div>
);

export default Welcome;

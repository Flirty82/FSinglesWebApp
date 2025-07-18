import { Link } from 'react-router-dom';
import React from 'react';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-hero">
        <h2>Welcome to Flirting Singles!</h2>
        <p>The #1 place to meet, flirt, and connect!</p>
        <div className="auth-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="signup" className="btn signup-btn">Sign Up</Link>
          </div>
        </div>
      </div>
  );
};

export default WelcomePage;
       
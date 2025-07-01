import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <h2>💘 Flirting Singles</h2>
    <ul>
      <li><Link to="/feed">Feed</Link></li>
      <li><Link to="/chat">Chat Rooms</Link></li>
      <li><Link to="/games">Games</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/how-to-play">How to Play</Link></li>
    </ul>
  </nav>
);

export default Navbar;

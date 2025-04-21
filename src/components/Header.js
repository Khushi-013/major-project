// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFileAlt, FaUsers, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import '../styles/Header.css'; // Make sure this path is correct

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Justiflow</Link>
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-item">
          <FaHome className="nav-icon" /> Home
        </Link>
        <Link to="/cases" className="nav-item">
          <FaFileAlt className="nav-icon" /> Cases
        </Link>
        <Link to="/about" className="nav-item">
          <FaUsers className="nav-icon" /> About Us
        </Link>
        <Link to="/login" className="nav-item">
          <FaSignInAlt className="nav-icon" /> Log In
        </Link>
        <Link to="/register" className="nav-item">
          <FaUserPlus className="nav-icon" /> Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;

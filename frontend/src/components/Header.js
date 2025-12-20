import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ isLoggedIn, onLogout }) {
  return (
    <header className="header">
      <div className="logo">
        U-L💗ve
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/video" className="nav-link">Dashboard</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link-primary">Login</Link>
            <Link to="/signup" className="nav-link-primary">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

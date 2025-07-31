import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, onLogout }) {
  return (
    <header className="header" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'}}>
      <div className="logo" style={{fontWeight: 'bold', fontSize: '2rem', color: '#e94057', letterSpacing: '2px'}}>
        U-L💗ve
      </div>
      <nav style={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
        <Link to="/" style={{textDecoration: 'none', color: '#222', fontWeight: 500}}>Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" style={{textDecoration: 'none', color: '#222', fontWeight: 500}}>Dashboard</Link>
            <Link to="/profile" style={{textDecoration: 'none', color: '#222', fontWeight: 500}}>Profile</Link>
            <button onClick={onLogout} style={{background: 'none', border: 'none', color: '#e94057', fontWeight: 500, cursor: 'pointer', fontSize: '1rem'}}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{textDecoration: 'none', color: '#e94057', fontWeight: 500}}>Login</Link>
            <Link to="/signup" style={{textDecoration: 'none', color: '#e94057', fontWeight: 500}}>Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

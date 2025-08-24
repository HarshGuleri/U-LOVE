import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Login.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Login successful!');
        localStorage.setItem('token', data.token);
        if (onLogin) onLogin(); // Redirect or update state
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Error connecting to server');
    }
  };

  return (
    <div className="login-container">
      <motion.div
        className="login-form-container"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <h2 className="login-title">💌 Login to U-Love</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input className="login-input" name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" required value={formData.password} className="login-input" onChange={handleChange} />
          <button type="submit" className="login-button">Login</button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;

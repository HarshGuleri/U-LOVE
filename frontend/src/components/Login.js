import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #ffe3e3 0%, #fff1f7 100%)'}}>
      <motion.div
        className="form-container"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        style={{background: '#fff', borderRadius: '2rem', boxShadow: '0 8px 32px rgba(233,64,87,0.12)', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 360, width: '100%'}}
      >
        <h2 style={{color: '#e94057', fontWeight: 700, marginBottom: '2rem', textAlign: 'center'}}>💌 Login to U-Love</h2>
        <form style={{display: 'flex', flexDirection: 'column', gap: '1.2rem'}} onSubmit={handleSubmit}>
          <input style={{padding: '0.9rem 1rem', borderRadius: '1rem', border: '1px solid #eee', fontSize: '1rem', outline: 'none'}} name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" required value={formData.password}style={{padding: '0.9rem 1rem', borderRadius: '1rem', border: '1px solid #eee', fontSize: '1rem', outline: 'none'}} onChange={handleChange} />
          <button type="submit" style={{background: 'linear-gradient(90deg, #e94057 0%, #ff6a88 100%)', color: '#fff', border: 'none', borderRadius: '1rem', padding: '1rem', fontWeight: 700, fontSize: '1.1rem', marginTop:'0.5rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(233,64,87,0.08)'}}>Login</button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Signup({ onSignup }) {
  const [formData, setFormData] = useState({
    name: '',
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
    const { name, email, password } = formData;

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Signup successful!');
        if (onSignup) onSignup(); // Redirect or update state
      } else {
        alert(data.message || 'Signup failed');
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
        <h2 style={{color: '#e94057', fontWeight: 700, marginBottom: '2rem', textAlign: 'center'}}>💖 Create your U-Love Account</h2>
        <form style={{display: 'flex', flexDirection: 'column', gap: '1.2rem'}} onSubmit={handleSubmit}>
          <input style={{padding: '0.9rem 1rem', borderRadius: '1rem', border: '1px solid #eee', fontSize: '1rem', outline: 'none'}} name="name" type="text" placeholder="Your Name" required value={formData.name} onChange={handleChange}/>
          <input name="email" type="email" placeholder="Email" required value={formData.email} style={{padding: '0.9rem 1rem', borderRadius: '1rem', border: '1px solid #eee', fontSize: '1rem', outline: 'none'}} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" required value={formData.password} onChange={handleChange} style={{padding: '0.9rem 1rem', borderRadius: '1rem', border: '1px solid #eee', fontSize: '1rem', outline: 'none'}} />
          <button type="submit" >Signup</button>
        </form>
      </motion.div>
    </div>
  );
}

export default Signup;

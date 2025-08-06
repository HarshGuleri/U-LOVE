import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Signup({ onSignup }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Step 1: Signup (triggers OTP send)
  const handleSignup = async e => {
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
        setOtpSent(true);
        alert('OTP sent to your email!');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      alert('Error connecting to server');
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async e => {
    e.preventDefault();
    const { email, otp } = formData;
    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (res.ok) {
        setOtpVerified(true);
        alert('OTP Verified! You can now log in.');
        if (onSignup) onSignup();
      } else {
        alert(data.message || 'Invalid OTP');
      }
    } catch (err) {
      alert('Error verifying OTP');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ffe3e3 0%, #fff1f7 100%)'
    }}>
      <motion.div
        className="form-container"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        style={{
          background: '#fff',
          borderRadius: '2rem',
          boxShadow: '0 8px 32px rgba(233,64,87,0.12)',
          padding: '2.5rem 2rem',
          minWidth: 340,
          maxWidth: 360,
          width: '100%'
        }}
      >
        <h2 style={{
          color: '#e94057',
          fontWeight: 700,
          marginBottom: '2rem',
          textAlign: 'center'
        }}>💖 Create your U-Love Account</h2>
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
          onSubmit={otpSent ? handleVerifyOtp : handleSignup}
        >
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={otpSent}
            style={inputStyle}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={otpSent}
            style={inputStyle}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            disabled={otpSent}
            style={inputStyle}
          />
          {otpSent && (
            <input
              name="otp"
              type="text"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          )}
          <button type="submit" style={btnStyle}>
            {otpSent ? 'Verify OTP' : 'Signup'}
          </button>
        </form>
        {otpVerified && (
          <p style={{ marginTop: '1rem', color: 'green', textAlign: 'center' }}>
            ✅ OTP Verified Successfully!
          </p>
        )}
      </motion.div>
    </div>
  );
}

const inputStyle = {
  padding: '0.9rem 1rem',
  borderRadius: '1rem',
  border: '1px solid #eee',
  fontSize: '1rem',
  outline: 'none'
};

const btnStyle = {
  padding: '0.9rem 1rem',
  borderRadius: '1rem',
  backgroundColor: '#e94057',
  color: '#fff',
  border: 'none',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer'
};

export default Signup;
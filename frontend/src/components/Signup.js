import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Signup.css';

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
    <div className="signup-container">
      <motion.div
        className="signup-form-container"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <h2 className="signup-title">💖 Create your U-Love Account</h2>
        <form
          className="signup-form"
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
            className="signup-input"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={otpSent}
            className="signup-input"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            disabled={otpSent}
            className="signup-input"
          />
          {otpSent && (
            <input
              name="otp"
              type="text"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              className="signup-input"
            />
          )}
          <button type="submit" className="signup-button">
            {otpSent ? 'Verify OTP' : 'Signup'}
          </button>
        </form>
        {otpVerified && (
          <p className="signup-success">
            ✅ OTP Verified Successfully!
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default Signup;
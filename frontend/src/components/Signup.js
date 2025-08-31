import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Signup({ onSignup }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', otp: '', gender: '', dateOfBirth: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSignup = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth
        })
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        alert('OTP sent to your email!');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.otp })
      });
      const data = await res.json();
      if (res.ok) {
        setFormData(prev => ({ ...prev, otp: '' }));
        setOtpVerified(true);
        if (data.token) localStorage.setItem('token', data.token);
        alert('OTP Verified! You are signed up.');
        navigate('/login');
        if (onSignup) onSignup();
      } else {
        alert(data.message || 'Invalid OTP');
      }

    } catch (err) {
      console.error(err);
      alert('Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (res.ok) {
        alert('OTP resent to your email.');
        setFormData(prev => ({ ...prev, otp: '' }));
      } else {
        alert(data.message || 'Resend failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error resending OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #ffe3e3 0%, #fff1f7 100%)' }}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: '#fff', borderRadius: '2rem', boxShadow: '0 8px 32px rgba(233,64,87,0.12)', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 360, width: '100%' }}>
        <h2 style={{ color: '#e94057', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>💖 Create your U-Love Account</h2>
        <form onSubmit={otpSent ? handleVerifyOtp : handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <input name="name" type="text" placeholder="Your Name" required value={formData.name} onChange={handleChange} disabled={otpSent || loading} style={inputStyle} />
          <input name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleChange} disabled={otpSent || loading} style={inputStyle} />
          <input name="password" type="password" placeholder="Password" required value={formData.password} onChange={handleChange} disabled={otpSent || loading} style={inputStyle} />
          <select name="gender" value={formData.gender} onChange={handleChange} disabled={otpSent || loading} style={inputStyle}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input name="dateOfBirth" type="date" placeholder="Date of Birth" required value={formData.dateOfBirth} onChange={handleChange} disabled={otpSent || loading} style={inputStyle} />
          {otpSent && <input name="otp" type="text" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} required style={inputStyle} />}
          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? 'Please wait...' : otpSent ? 'Verify OTP' : 'Signup'}
          </button>
        </form>

        {otpSent && !otpVerified && (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button onClick={handleResend} disabled={loading} style={{ background: 'none', border: 'none', color: '#e94057', cursor: 'pointer' }}>
              Resend OTP
            </button>
          </div>
        )}

        {otpVerified && <p style={{ marginTop: '1rem', color: 'green', textAlign: 'center' }}>✅ OTP Verified Successfully!</p>}
      </motion.div>
    </div>
  );
}

const inputStyle = { padding: '0.9rem 1rem', borderRadius: '1rem', border: '1px solid #eee', fontSize: '1rem', outline: 'none' };
const btnStyle = { padding: '0.9rem 1rem', borderRadius: '1rem', backgroundColor: '#e94057', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' };

export default Signup;
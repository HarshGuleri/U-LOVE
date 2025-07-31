import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import CoupleShowcase from './components/CoupleShowcase';
import TinderPromo from './components/TinderPromo';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

function Landing({ isLoggedIn, onLogout }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <Hero />
      <Features />
      <CoupleShowcase />
      <TinderPromo />
      <Footer />
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handlers to pass to Login/Signup
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // Wrapper for Login/Signup to inject login handler
  const LoginWrapper = () => {
    const navigate = useNavigate();
    return <Login onLogin={() => { handleLogin(); navigate('/dashboard'); }} />;
  };
  const SignupWrapper = () => {
    const navigate = useNavigate();
    return <Signup onSignup={() => { handleLogin(); navigate('/dashboard'); }} />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/signup" element={<SignupWrapper />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <LoginWrapper />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <LoginWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;

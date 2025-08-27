// controllers/authControllers.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateOTP = require('../utils/otp');
const sendOTPEmail = require('../utils/sendMail');

const JWT_EXPIRES = process.env.JWT_EXPIRES || '1d';
const OTP_TTL_MINUTES = parseInt(process.env.OTP_TTL_MINUTES, 10) || 5;

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email.endsWith('@chitkara.edu.in')) {
      return res.status(400).json({ message: 'Only Chitkarians are allowed.' });
    }

    const existing = await User.findOne({ email }).lean();
    if (existing) return res.status(409).json({ message: 'User already exists' });

    const user = new User({ name, email, password });
    const otp = generateOTP();
    await user.setOTP(otp, OTP_TTL_MINUTES);
    await user.save();

    await sendOTPEmail(email, otp);
    return res.status(201).json({ message: 'Signup created. OTP sent to email.' });
  } catch (err) {
    console.error('signup error', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP required' });

    const user = await User.findOne({ email }).select('+verification.otpHash +verification.otpExpiresAt');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const ok = await user.verifyOTP(otp);
    if (!ok) return res.status(400).json({ message: 'Invalid or expired OTP' });

    user.verification.emailVerified = true;
    user.verification.otpHash = undefined;
    user.verification.otpExpiresAt = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES });
    return res.status(200).json({
      message: 'Signup verified and complete',
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.error('verifyOtp error', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email }).select('+password +verification.emailVerified');
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    if (!user.verification?.emailVerified) {
      return res.status(403).json({ message: 'Email not verified. Please verify before logging in.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES });
    return res.json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.error('login error', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Resend OTP
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Optionally throttle resends: check last OTP time or store a resendCount
    const otp = generateOTP();
    await user.setOTP(otp, OTP_TTL_MINUTES);
    await user.save();

    await sendOTPEmail(email, otp);
    return res.json({ message: 'OTP resent to email' });
  } catch (err) {
    console.error('resendOtp error', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

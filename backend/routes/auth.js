// routes/auth.js
const express = require('express');
const router = express.Router();
const { signup, login, verifyOtp, resendOtp } = require('../controllers/authControllers');

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/login', login);

module.exports = router;

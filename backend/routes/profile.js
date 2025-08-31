const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getProfile, updateProfile, changePassword } = require('../controllers/profileController');

// @route   GET /api/profile
// @desc    Get current user's profile
// @access  Private
router.get('/', auth, getProfile);

// @route   PUT /api/profile
// @desc    Update user profile
// @access  Private
router.put('/', auth, updateProfile);

// @route   PUT /api/profile/password
// @desc    Change user password
// @access  Private
router.put('/password', auth, changePassword);

module.exports = router;

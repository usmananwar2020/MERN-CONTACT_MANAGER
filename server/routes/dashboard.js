const { getDashboardStats } = require('../controller/dashboard');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

// Get all reminders for a user
router.get('/', [auth, admin], getDashboardStats)

module.exports = router;
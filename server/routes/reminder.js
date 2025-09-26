

const { getReminders, preserveReminders } = require('../controller/reminder');
const auth = require('../middleware/auth');
const cronAuth = require('../middleware/cronAuth');
const express = require('express');
const router = express.Router();

// Get all reminders for a user
router.get('/', auth, getReminders)

//Preserve only 10 reminders for each user
router.delete('/preserve' , cronAuth, preserveReminders)

module.exports = router;
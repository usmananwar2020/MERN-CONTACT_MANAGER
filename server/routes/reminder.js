

const { getReminders, toggleReminder } = require('../controller/reminder');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

// Get all reminders for a user
router.get('/', auth, getReminders)

// update User for active/inactive reminder
router.put('/status/:id', toggleReminder)

module.exports = router;
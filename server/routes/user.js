const express = require('express');
const router = express.Router();
const { registerUser } = require('../controller/user/register');
const { loginUser } = require('../controller/user/login');



router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router;
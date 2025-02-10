const express = require('express');
const router = express.Router();
const { registerUser } = require('../controller/user/register');
const { loginUser } = require('../controller/user/login');
const { Validate, ValidateLogin } = require('../validator/user');



router.post('/register', Validate, registerUser)
router.post('/login', ValidateLogin, loginUser)

module.exports = router;
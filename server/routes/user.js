const {Users, Validate, ValidateLogin} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();



router.post('/register',async(req, res) => {
    const {error} = Validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await Users.findOne({email: req.body.email});
    if(user) return res.status(400).send({
        message: 'Email already exist',
        data: [],
        error: true
    });

    user = new Users(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await  bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    
    await user.save();

    const token = user.generateAuthToken();
    const result = _.pick(user,['_id', 'username', 'email'])
    result.token = token;

    res.send({
        message: 'User register successfully',
        data: result,
        error: false
    })
})

router.post('/login', async(req, res) => {
    const {error} = ValidateLogin(req.body);
    if(error) return res.status(400).send({
        message: error.details[0].message,
        data: [],
        error: true
    });

    let user = await Users.findOne({email: req.body.email});
    if(!user) return res.status(400).send({
        message: 'Email do not exist',
        data: [],
        error: true
    });

    const comparePassword = await bcrypt.compare(req.body.password, user.password);
    
    if(!comparePassword){
        return res.status(400).send({
            message: 'Invalid Email or Password',
            data: [],
            error: true
        });
    }

    const token = user.generateAuthToken();
    const result = _.pick(user,['_id', 'username', 'email', 'isAdmin'])
    result.token = token;
    res.send({
        message: 'User Login successfully',
        data: result,
        error: false
    })
})

module.exports = router;
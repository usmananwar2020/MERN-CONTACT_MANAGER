const { CheckEmail, validateUser } = require("../../services/user");
const { OnboardingKeys } = ("../../utils/enum");
const { Users } = ("../../models/user");
const _ = require('lodash');
const bcrypt = require('bcrypt');

const registerUser = async(req, res) => {
        validateUser(req, OnboardingKeys?.REGISTER)
    
        if(CheckEmail(req)) return res.status(400).send({
            message: 'Email already exist',
            data: [],
            error: true
        });
    
        let user = new Users(req.body);
    
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
    }
exports.registerUser = registerUser;
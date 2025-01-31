const { CheckEmail, validateUser } = require("../../services/user");
const { OnboardingKeys } = require("../../utils/enum");
const _ = require('lodash');
const bcrypt = require('bcrypt');

const loginUser = async(req, res) => {
    validateUser(req, OnboardingKeys.LOGIN)

    let user = await CheckEmail(req)
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
}
exports.loginUser = loginUser;
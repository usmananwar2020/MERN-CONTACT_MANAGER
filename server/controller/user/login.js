const { CheckEmail } = require("../../services/user");
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { Failuer, Success } = require("../../utils/responseHandler");

const loginUser = async(req, res) => {

    let user = await CheckEmail(req)
    if(!user) return Failuer(res, true, 400, 'Email do not exist', [])

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

    Success(res, false, 'User login successfully', result)
}
exports.loginUser = loginUser;
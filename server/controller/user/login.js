const { CheckEmail } = require("../../services/user");
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { Failuer, Success } = require("../../utils/responseHandler");
const { GenerateAuthToken } = require("../../utils/authToken");

const loginUser = async(req, res) => {
    try{
        let user = await CheckEmail(req)
        if(!user) return Failuer(res, true, 400, 'Email do not exist', [])

        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        
        if(!comparePassword){
            return Failuer(res, true, 400, 'Invalid Email or Password', [])
        }

        const token = GenerateAuthToken(user);
        const result = _.pick(user,['_id', 'username', 'email', 'isAdmin'])
        result.token = token;

        Success(res, false, 'User login successfully', result)
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }
}
exports.loginUser = loginUser;
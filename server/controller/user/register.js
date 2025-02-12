const { CheckEmail } = require("../../services/user");
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { Users } = require("../../models/user");
const { Success, Failuer } = require("../../utils/responseHandler");

const registerUser = async(req, res) => {

        let _checkEmail = await CheckEmail(req);
        if(_checkEmail) return Failuer(res, true, 400, 'Email already exist', [])
    
        let user = new Users(req.body);
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await  bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        
        await user.save();
    
        const token = user.generateAuthToken();
        const result = _.pick(user,['_id', 'username', 'email'])
        result.token = token;


        Success(res, false, 'User register successfully', result)
    }
exports.registerUser = registerUser;
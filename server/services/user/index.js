const { OnboardingKeys } = require("../../utils/enum");

const { Users, Validate, ValidateLogin } = require("../../models/user");


const validateUser = (req, mode) => {
    let _validate = {}
    if(OnboardingKeys.REGISTER === mode){
        _validate = Validate(req.body);
    }else{
        _validate = ValidateLogin(req.body);
    }
        if(_validate.error) return res.status(400).send({
            message: _validate.error.details[0].message,
            data: [],
            error: true
        });
}

const CheckEmail = async (req) => {
    return await Users.findOne({email: req.body.email});
     
}
exports.CheckEmail = CheckEmail;
exports.validateUser = validateUser;
const Joi = require('joi');
const { Failuer } = require('../utils/responseHandler');


 function registerUserValidation (req, res, next) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(5).max(1024).required(),
        isAdmin: Joi.boolean()
    })
    let _validate = schema.validate(req.body);
    if(_validate.error) {
        return Failuer(res, true, 400, _validate?.error?.details[0]?.message, [])
    }
    else{
        next();
    }
 }


 function userValidation (req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(5).max(1024).required(),
    })
    let _validate = schema.validate(req.body);
    if(_validate.error) {
        return Failuer(res, true, 400, _validate?.error?.details[0]?.message, [])
    }else{
        next();
    }
}

 exports.Validate = registerUserValidation;
 exports.ValidateLogin = userValidation;
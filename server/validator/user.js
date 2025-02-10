const Joi = require('joi');


 function registerUserValidation (req, res, next) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(5).max(1024).required(),
        isAdmin: Joi.boolean()
    })
    let _validate = schema.validate(req.body);
    if(_validate.error) {
        return res.status(400).send({
        message: _validate?.error?.details[0]?.message,
        data: [],
        error: true
        });
    }else{
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
        return res.status(400).send({
        message: _validate?.error?.details[0]?.message,
        data: [],
        error: true
        });
    }else{
        next();
    }
}

 exports.Validate = registerUserValidation;
 exports.ValidateLogin = userValidation;
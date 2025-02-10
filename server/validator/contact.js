const Joi = require('joi');
function contactValidation(req, res, next){
    const contactSchema = Joi.object({
        firstname:Joi.string().max(50).min(3).required(),
        lastname:Joi.string().max(50).min(3).required(),
        email:Joi.string().max(255).min(3).email().required(),
        phone:Joi.string().max(50).min(11).required(),
        address:Joi.string().max(255).min(3).required(),
        note:Joi.string().max(1024),
        category:Joi.string().required(),
        userId: Joi.string().required()
    })
    let _validate = contactSchema.validate(req.body);
    if(_validate.error) {
        return res.status(400).send({
        message: _validate?.error?.details[0]?.message,
        data: [],
        error: true
        });
    } else {
        next()
    }
}

exports.Validate = contactValidation;
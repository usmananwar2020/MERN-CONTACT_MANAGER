const Joi = require('joi');

const categoryValidation = (req, res, next) => {
    const categorySchema = Joi.object({
        category: Joi.string().required()
    })

    let _validate = categorySchema.validate(req.body);
    if(_validate.error) {
        return res.status(400).send({
        message: _validate?.error?.details[0]?.message,
        data: [],
        error: true
        });
    } else {
        next();
    }
}

exports.Validate = categoryValidation;
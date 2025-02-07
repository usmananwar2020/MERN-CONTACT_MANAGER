const { Validate } = require("../../models/contact");

const validateContact = (req) => {
    const {error} = Validate(req.body);
    if(error){
        return res.status(400).send({
            error: true,
            message: error.details[0].message,
            data: null
        });
    }
}

exports.validateContact = validateContact;



    
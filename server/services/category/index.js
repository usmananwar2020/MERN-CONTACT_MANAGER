const { Validate } = require("../../models/category");

const ValidateCategory = (req) => {
    const {error} = Validate(req.body);
    if(error){
        return res.status(400).send({
            message: error?.details[0]?.message,
            error: true,
            date: []
        })
    }
}

const category404 = (res) => {
    return res.status(404).send({
        message: 'Category doesnot exist',
        error: true,
        data: []
    })
}

exports.ValidateCategory = ValidateCategory;
exports.category404 = category404;
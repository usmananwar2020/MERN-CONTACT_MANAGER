const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = mongoose.Schema({
    category : {
        type: String,
        required: true,
        trim: true
    }
})

const categoryValidation = (cate) => {
    const categorySchema = Joi.object({
        category: Joi.string().required()
    })
    return categorySchema.validate(cate);
}

const category = mongoose.model('category', categorySchema)

exports.Category = category;
exports.Validate = categoryValidation;
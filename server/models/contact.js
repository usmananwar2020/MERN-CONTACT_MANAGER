const mongoose = require('mongoose');
const Joi = require('joi');


const contactSchema = mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        min: 3,
        max: 50,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        min: 3,
        max: 50,
        required: true
    },
    email: {
        type: String,
        trim: true,
        min: 3,
        max: 255,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        min: 11,
        max: 50,
        required: true
    },
    address: {
        type: String,
        trim: true,
        min: 3,
        max: 255,
    },
    note: {
        type: String,
        trim: true,
        max: 1024,
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Contact = mongoose.model('contact', contactSchema);


function contactValidation(contact){
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
    return contactSchema.validate(contact);
}

exports.Contact = Contact;
exports.Validate = contactValidation;
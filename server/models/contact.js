const mongoose = require('mongoose');


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
    },
    favourite: {
        type: Number,
        default: 0
    }
});

const Contact = mongoose.model('contact', contactSchema);

exports.Contact = Contact;
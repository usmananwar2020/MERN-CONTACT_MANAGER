const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category : {
        type: String,
        required: true,
        trim: true
    }
})

const category = mongoose.model('category', categorySchema)

exports.Category = category;
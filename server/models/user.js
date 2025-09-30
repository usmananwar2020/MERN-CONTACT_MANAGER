 const mongoose = require('mongoose');

 const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        min: 5,
        max: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        min: 5,
        max: 255,
        required: true
    },
    password:{
        type: String,
        min: 5,
        max: 1024,
        required: true
    },
    isAdmin: {
        type: Boolean
    },
    reminder: {
        type: Boolean
    }
 });


 const User = mongoose.model('User', userSchema);

 exports.Users = User;
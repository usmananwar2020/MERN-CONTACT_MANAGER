 const mongoose = require('mongoose');
 const Joi = require('joi');
 const JWT = require('jsonwebtoken');
 const config = require('config');


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
    }
 });

 userSchema.methods.generateAuthToken = function(){
        const token = JWT.sign({_id: this.id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
        return token;
    }

 const User = mongoose.model('User', userSchema);

 function registerUserValidation (user) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(5).max(1024).required(),
        isAdmin: Joi.boolean()
    })
    return schema.validate(user);
 }
 function userValidation (user) {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(5).max(1024).required(),
    })
    return schema.validate(user);
 }


 exports.Users = User;
 exports.Validate = registerUserValidation;
 exports.ValidateLogin = userValidation;
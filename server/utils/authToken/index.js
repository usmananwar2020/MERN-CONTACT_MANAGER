const JWT = require('jsonwebtoken');
 const config = require('config');

const generateAuthToken = function(user){
        const token = JWT.sign({_id: user.id, isAdmin: user.isAdmin}, config.get('jwtPrivateKey'));
        return token;
    }
exports.GenerateAuthToken = generateAuthToken;
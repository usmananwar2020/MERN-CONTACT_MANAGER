const JWT = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('authorization')?.split(" ");
    if(!token?.[1]) return res.status(400).send({
        message: 'Token not exist',
        data: [],
        error: true
    });

    try{
        const isVerified  = JWT.verify(token[1], config.get('jwtPrivateKey'));
        req.user = isVerified;
        next();
    }
    catch(err){
        res.status(400).send({
            message: 'Invalid token',
            data: [],
            error: true
        })
    }
}
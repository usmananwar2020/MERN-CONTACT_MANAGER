const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost:27017/Contact-Manager')
    .then(()=> console.log("connected ..."))
    .catch((err) => console.log('err ==',err.message ));
}
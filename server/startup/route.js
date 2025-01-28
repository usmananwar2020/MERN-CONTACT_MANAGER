const express = require('express');
const user = require("../routes/user");
const contact = require("../routes/contact");
const category = require("../routes/category");

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', user)
    app.use('/api/contacts', contact)
    app.use('/api/categories', category)
};
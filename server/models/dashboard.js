const mongoose = require('mongoose');

const dashboardSchema = mongoose.Schema({
    totalUsers: {
        type: Number,
        required: true,
    },
    totalContacts: {
        type: Number,
        required: true,
    },
    totalCategories: {
        type: Number,
        required: true,
    },
    totalReminders: {
        type: Number,
        required: true,
    },
    totalFavourite: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        trim: true,
        max: 1024,
    },
}, {
    timestamps: true
})

const Dashboard = mongoose.model('dashboard', dashboardSchema)

exports.Dashboard = Dashboard;
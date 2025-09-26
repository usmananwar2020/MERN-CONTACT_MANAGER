const mongoose = require('mongoose');

const reminderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        max: 1024,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
})

const Reminder = mongoose.model('reminder', reminderSchema)

exports.Reminder = Reminder;
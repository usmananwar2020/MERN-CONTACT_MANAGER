const { Contact } = require("../../models/contact");
const { Reminder } = require("../../models/reminder");
const { Users } = require("../../models/user");



const getAllDashboardStats = async (req) => {
    if (req.user.isAdmin) {
        switch (req.query.type) {
            case 'users':
                return await Users.find({}, { username: 1, email: 1, _id: 0 })
            case 'contacts':
                return await Contact.find({}, { firstname: 1, lastname: 1, phone: 1, address: 1, _id: 0 })
            default:
                return await Reminder.find({}, { title: 1, description: 1, _id: 0 })
        }
    } else {
        switch (req.query.type) {
            case 'contacts':
                return await Contact.find({ userId: req.user._id }, { firstname: 1, lastname: 1, phone: 1, address: 1, _id: 0 })
            default:
                return await Reminder.find({ userId: req.user._id }, { title: 1, description: 1, _id: 0 })
        }
    }

}
const getAllDataCount = async (req) => {
    if (req.user.isAdmin) {
        const totalCount = {
            totalUser: await Users.find().countDocuments(),
            totalContact: await Contact.find().countDocuments(),
            totalReminder: await Reminder.find().countDocuments()
        }
        return totalCount;
    } else {
        const totalCount = {
            totalContact: await Contact.find({ userId: req.user._id }).countDocuments(),
            totalReminder: await Reminder.find({ userId: req.user._id }).countDocuments()
        }
        return totalCount;
    }

}

exports.getAllDashboardStats = getAllDashboardStats
exports.getAllDataCount = getAllDataCount
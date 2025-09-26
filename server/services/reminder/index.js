const { Reminder } = require("../../models/reminder");

const searchAllReminders = (req) => {
    const searchParams = req.query;
    let query = {userId: req.user._id};
    if(searchParams.search){
            query.$or = [
                {title: { $regex: new RegExp(searchParams.search, 'i') }}
            ]
        }
        return Reminder.find(query).populate('userId');
}

exports.searchAllReminders = searchAllReminders
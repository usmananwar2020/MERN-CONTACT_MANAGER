const { Reminder } = require("../../models/reminder");
const { Success, Failuer } = require("../../utils/responseHandler");
const { searchAllReminders } = require("../../services/reminder")

const getReminders = async (req, res) => {
    try{
        const reminder = await searchAllReminders(req);
        Success(res, false, 'Retrive all contact successfully', reminder);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }
}
const createReminders = async (req, res) => {
    try{
        let reminder = await new Reminder(req.body);
        reminder.save();
        Success(res, false, 'Reminder added successfully', req.body);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }
}
exports.getReminders = getReminders;
exports.createReminders = createReminders;
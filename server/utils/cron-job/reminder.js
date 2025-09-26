const cron = require('node-cron');
const { Reminder } = require('../../models/reminder');
const { Users } = require('../../models/user');
const { SendMail } = require('../mailer');
const dailyReminder = [
    { title: 'Today is Sunday', description: "This is your daily reminder to take a moment for your health — small steps every day make a big difference." },
    { title: 'Today is Monday', description: "A gentle nudge: your health is your wealth. Take care of yourself today." },
    { title: 'Today is Tuesday', description: "Daily reminder: pause, breathe, and choose something healthy for your body and mind." },
    { title: 'Today is Wednesday', description: "Health is a habit. This is your reminder to make a positive choice today." },
    { title: 'Today is Thursday', description: "Your well-being matters. Take this moment as a daily reminder to care for yourself." },
    { title: 'Today is Friday', description: "Jummah Mobarak!!!." },
    { title: 'Today is Saturday', description: "Daily reminder: invest in your health today, your future self will thank you." },
]
const getReminderUsers = async() => {
    const date = new Date();
    const numberOfTheDay = date.getDay();
    const userIds = await Users.find({ reminder: true }, { _id: 1 });
    userIds?.forEach(user =>
        addUserReminder({ userId: user._id, ...dailyReminder[numberOfTheDay] })
    )

}
const addUserReminder = async (payload) => {
    let reminder = await new Reminder(payload);
    reminder.save();
}
const deleteOldReminder = async () => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    await Reminder.deleteMany({ createdAt: { $lt: date } });
}

cron.schedule('0 10 * * *', getReminderUsers)
cron.schedule('0 16 * * *', getReminderUsers)
cron.schedule('25 10 * * *', deleteOldReminder)
cron.schedule('0 12 * * *', SendMail)

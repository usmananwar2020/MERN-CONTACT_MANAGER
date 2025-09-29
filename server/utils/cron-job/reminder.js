const cron = require('node-cron');
const { SendMail } = require('../mailer');
const { getReminderUsers, deleteOldReminder } = require('../../services/reminder');


cron.schedule('0 10 * * *', getReminderUsers)
cron.schedule('0 16 * * *', getReminderUsers)
cron.schedule('30 10 * * *', deleteOldReminder)
cron.schedule('0 12 * * *', SendMail)

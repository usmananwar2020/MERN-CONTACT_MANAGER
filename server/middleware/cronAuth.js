

require("dotenv").config();
module.exports = function (req, res, next) {
    console.log("req.header ==", req.header('reminder-by-cron'))
    const token = req.header('reminder-by-cron');
    if (!token) return res.status(400).send({
        message: 'Token not exist',
        data: [],
        error: true
    });

    try {
        const isVerified = token === process.env.CONTACT_MANAGER_CRON_AUTH_TOKEN;

        if (!isVerified) {
            throw new Error("Invalid token"); // force catch block to run
        }

        req.cronauth = true;
        next();
    } catch (err) {
        res.status(400).send({
            message: 'Invalid token',
            data: [],
            error: true
        });
    }
}
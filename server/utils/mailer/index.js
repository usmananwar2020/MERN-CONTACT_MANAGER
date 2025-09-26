const nodeMailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Load HTML file as string
const templatePath = path.join(__dirname, 'emailTemplate.html');
const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');
console.log(process.env.EMAIL_USER)
const transport = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})
const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'muhammadusman1531995@gmail.com',
    subject: 'Invitation to Connect on LinkedIn 👋',
    html: htmlTemplate
};
const SendMail = () => {
    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('mail error', error)
        } else {
            console.log('mail info', info.response)
        }
    })
}
exports.SendMail = SendMail
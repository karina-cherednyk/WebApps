const nodemailer = require("nodemailer");

const myAuth = {
    user: process.env.gmail_username,
    pass: process.env.gmail_password
};

async function sendMail(users, msgText, subject='Spam') {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false,
        auth: myAuth,
        tls:{
            rejectUnauthorized:false
        }
    });
    let mail = {
        from: myAuth.user,
        to: users,
        subject: subject,
        text: msgText
    };
    return transporter.sendMail(mail);
}

module.exports = sendMail;
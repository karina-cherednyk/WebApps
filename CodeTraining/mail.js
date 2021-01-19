const nodemailer = require("nodemailer");

const myAuth = {
    user: process.env.gmail_username,
    pass: process.env.gmail_password
};

async function sendMail(email, hash,  subject='Confirmation link') {
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
        to: email,
        subject: subject,
        text: `Click on link to confirm your email: http://localhost:3000/confirmation/${hash}`
    };
    return transporter.sendMail(mail);
}

module.exports = sendMail;
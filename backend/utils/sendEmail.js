const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'openshipai@gmail.com',
            pass: 'ikug wqac hidc gian'
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    const mailOptions = {
        from: 'premiantltd@gmail.com',
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
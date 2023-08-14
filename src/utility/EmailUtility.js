const nodemailer = require('nodemailer')

const SendEmail = async (EmailTo, EmailText, EmailSubject) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        auth: {
            user: 'rahim.abdurdu16292014@gmail.com',
            pass: 'lgeqwuqoukgxcvwk'
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    let options = {
        from: 'Inventory Management MERN <rahim.abdurdu16292014@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    }

    return await transporter.sendMail(options);
}

module.exports = SendEmail
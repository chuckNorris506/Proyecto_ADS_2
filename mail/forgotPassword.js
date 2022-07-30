const nodemailer = require('nodemailer')

const transporter  =  nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // hostname
    port: process.env.EMAIL_PORT, // port for secure SMTP
    secureConnection: false,
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

module.exports = {transporter}
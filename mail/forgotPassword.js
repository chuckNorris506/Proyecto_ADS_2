/* Importing the nodemailer module. */
const nodemailer = require('nodemailer')

/* Creating a transporter object that will be used to send emails. */
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

/* Exporting the transporter object so that it can be used in other files. */
module.exports = {transporter}
const nodemailer = require('nodemailer')

const transporter  =  nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    port: 587, // port for secure SMTP
    secureConnection: false,
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: "proyecto_ads_2@outlook.com",
        pass: "ADS_2_PASS"
    }
})

module.exports = {transporter}
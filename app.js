const https = require("https");
const fs = require("fs");
const express = require('express')
const app = express()
require('dotenv').config()
require('express-async-errors')

const { authenticate, authenticateResetPassword } = require('./middleware/authenticate')
const user = require('./routes/user')
const professor = require('./routes/professor')
const subject = require('./routes/subject')
const course = require('./routes/course')
const alert = require('./routes/alert')
const campus = require('./routes/campus')
const notFound = require('./routes/notFound')

app.use(express.json())
app.use(express.static('views'))
app.use(express.static('public'))

app.use('/api/v1/user', user)
app.use('/api/v1/professor', authenticate, professor)
app.use('/api/v1/subject', authenticate, subject)
app.use('/api/v1/course', authenticate, course)
app.use('/api/v1/alert', authenticate, alert)
app.use('/api/v1/campus', authenticate, campus)
app.get('/reset-password/:token', authenticateResetPassword, user)
app.use('*', notFound)

https.createServer({
    // generar certificado self-signed
    //https://adamtheautomator.com/https-nodejs/
    key: fs.readFileSync('./certificate/key.pem'),
    cert: fs.readFileSync('./certificate/cert.pem')
}, app)
    .listen(process.env.SERVER_PORT, async () => {
        console.log(`Server is listening on port ${process.env.SERVER_PORT}`)
    })

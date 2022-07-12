const express = require('express')
const app = express()
require('dotenv').config()
require('express-async-errors')

const {authenticate} = require('./middleware/authenticate')
const authentication = require('./routes/authentication')
const professor = require('./routes/professor')
const subject = require('./routes/subject')
const course = require('./routes/course')
const alert = require('./routes/alert')

app.use(express.json())
app.use(express.static('views'))
app.use(express.static('public'))
app.use('/api/v1/authentication', authentication)
app.use('/api/v1/professor', authenticate, professor)
app.use('/api/v1/subject', authenticate, subject)
app.use('/api/v1/course', authenticate, course)
app.use('/api/v1/alert', authenticate, alert)

app.listen(process.env.SERVER_PORT, async () => {
    console.log(`Server is listening on port ${process.env.SERVER_PORT}`)
})
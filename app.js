/* Importing the https module. */
const https = require("https");
/* Importing the file system module. */
const fs = require("fs");
/* Importing the express module. */
const express = require('express')
/* Creating an instance of the express module. */
const app = express()
/* Loading the environment variables from the .env file. */
require('dotenv').config()
/* A module that allows you to use async/await in your routes. */
require('express-async-errors')

/* Importing the authenticate and authenticateResetPassword functions from the authenticate.js file. */
const { authenticate, authenticateResetPassword } = require('./middleware/authenticate')
/* Importing the user.js file from the routes folder. */
const user = require('./routes/user')
/* Importing the professor.js file from the routes folder. */
const professor = require('./routes/professor')
/* Importing the subject.js file from the routes folder. */
const subject = require('./routes/subject')
/* Importing the course.js file from the routes folder. */
const course = require('./routes/course')
/* Importing the alert.js file from the routes folder. */
const alert = require('./routes/alert')
/* Importing the campus.js file from the routes folder. */
const campus = require('./routes/campus')
/* Importing the notFound.js file from the routes folder. */
const notFound = require('./routes/notFound')

/* A middleware that parses the body of the request and makes it available in the req.body property. */
app.use(express.json())
/* Telling express to serve the files in the views folder. */
app.use(express.static('views'))
app.use(express.static('public'))

/* Telling express to use the user.js file from the routes folder when the user goes to the
/api/v1/user route. */
app.use('/api/v1/user', user)
/* Telling express to use the professor.js file from the routes folder when the user goes to the
/api/v1/professor route. */
app.use('/api/v1/professor', authenticate, professor)
/* Telling express to use the subject.js file from the routes folder when the user goes to the
/api/v1/subject route. */
app.use('/api/v1/subject', authenticate, subject)
/* Telling express to use the course.js file from the routes folder when the user goes to the
/api/v1/course route. */
app.use('/api/v1/course', authenticate, course)
/* Telling express to use the alert.js file from the routes folder when the user goes to the
/api/v1/alert route. */
app.use('/api/v1/alert', authenticate, alert)
/* Telling express to use the campus.js file from the routes folder when the user goes to the
/api/v1/campus route. */
app.use('/api/v1/campus', authenticate, campus)
/* Telling express to use the user.js file from the routes folder when the user goes to the
/reset-password/:token route. */
app.get('/reset-password/:token', authenticateResetPassword, user)
/* Telling express to use the notFound.js file from the routes folder when the user goes to any route
that is not defined. */
app.use('*', notFound)

/* Creating a server that listens on the port specified in the .env file. */
https.createServer({
    // generar certificado self-signed
    //https://adamtheautomator.com/https-nodejs/
    /* Reading the key.pem file and storing it in the key variable. */
    key: fs.readFileSync('./certificate/key.pem'),
    /* Reading the cert.pem file and storing it in the cert variable. */
    cert: fs.readFileSync('./certificate/cert.pem')
/* Creating a server that listens on the port specified in the .env file. */
}, app)
    .listen(process.env.SERVER_PORT, async () => {
        console.log(`Server is listening on port ${process.env.SERVER_PORT}`)
    })

/* Importing the express module. */
const express = require('express')
/* Creating a new router object. */
const router = express.Router()
/* Importing the getAlerts function from the alert.js file. */
const { getAlerts } = require('../controllers/alert')

/* Creating a route for the getAlerts function. */
router.get('/', getAlerts)

/* Exporting the router object. */
module.exports = router
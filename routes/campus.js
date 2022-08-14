/* Importing the express module. */
const express = require('express')
/* Creating a new router object. */
const router = express.Router()
/* Importing the getCampuses function from the campus.js file. */
const { getCampuses } = require('../controllers/campus')

/* This is a route handler. It is telling the router to handle a GET request to the root route (`/`) by
calling the `getCampuses` function. */
router.get('/', getCampuses)

/* This is telling the router to export the router object. */
module.exports = router
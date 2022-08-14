/* Importing the express module. */
const express = require('express')
/* Creating a new router object. */
const router = express.Router()
/* Importing the authenticate function from the authenticate.js file. */
const {authenticate} = require('../middleware/authenticate')
/* Importing the functions from the user.js file in the controllers folder. */
const {login, register, updateUser, deleteUser, getUsers, sendMail, resetPassword} = require('../controllers/user')


/* Creating a route for the forgot-password page. */
router.post('/forgot-password',sendMail)
/* Creating a route for the login page. */
router.post('/login', login)
/* Creating a route for the register page. */
router.post('/register', authenticate, register)
/* Updating the user. */
router.put('/:id', authenticate, updateUser)
/* Deleting the user. */
router.delete('/:id', authenticate, deleteUser)
/* Getting all the users. */
router.get('/',getUsers)
/* A route for the reset-password page. */
router.put('/reset-password/:id', resetPassword)


/* Exporting the router object. */
module.exports = router
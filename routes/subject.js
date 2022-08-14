/* Importing the express module. */
const express = require('express')
/* Creating a new router object. */
const router = express.Router()
/* Importing the functions from the subject controller. */
const { createSubject, getSubjects, updateSubject, deleteSubject } = require('../controllers/subject')

/* Creating a route for the get request. */
router.get('/', getSubjects)
/* Creating a route for the post request. */
router.post('/', createSubject)
/* Creating a route for the put request. */
router.put('/:id', updateSubject)
/* Creating a route for the delete request. */
router.delete('/:id', deleteSubject)

/* Exporting the router object. */
module.exports = router
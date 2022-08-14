/* Importing the express module. */
const express = require('express')
/* Creating a router object. */
const router = express.Router()
/* Importing the functions from the professor controller. */
const { createProfessor, getProfessors, updateProfessor, deleteProfessor } = require('../controllers/professor')

/* Creating a route for the get request. */
router.get('/', getProfessors)
/* Creating a route for the post request. */
router.post('/', createProfessor)
/* Creating a route for the put request. */
router.put('/:id', updateProfessor)
/* Creating a route for the delete request. */
router.delete('/:id', deleteProfessor)

/* Exporting the router object. */
module.exports = router
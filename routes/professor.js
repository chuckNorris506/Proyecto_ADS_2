const express = require('express')
const router = express.Router()
const {createProfessor, getProfessors} = require('../controllers/professor')

router.post('/', createProfessor).get('/', getProfessors)

module.exports = router
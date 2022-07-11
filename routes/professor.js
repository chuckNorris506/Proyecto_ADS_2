const express = require('express')
const router = express.Router()
const { createProfessor, getProfessors, updateProfessor, deleteProfessor } = require('../controllers/professor')

router.get('/', getProfessors)
router.post('/', createProfessor)
router.put('/:id', updateProfessor)
router.delete('/:id', deleteProfessor)


module.exports = router
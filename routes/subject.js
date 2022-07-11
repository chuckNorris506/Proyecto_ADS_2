const express = require('express')
const router = express.Router()
const { createSubject, getSubjects, updateSubject, deleteSubject } = require('../controllers/subject')

router.get('/', getSubjects)
router.post('/', createSubject)
router.patch('/:id', updateSubject)
router.delete('/:id', deleteSubject)


module.exports = router
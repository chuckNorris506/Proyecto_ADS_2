const express = require('express')
const router = express.Router()
const {createSubject,getSubjects} = require('../controllers/subject')

router.post('/', createSubject).get('/', getSubjects)

module.exports = router
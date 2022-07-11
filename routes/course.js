const express = require('express')
const router = express.Router()
const { createCourse, getCourse } = require('../controllers/course')

router.get('/:id', getCourse)
router.post('/', createCourse)


module.exports = router
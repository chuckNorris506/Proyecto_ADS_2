const express = require('express')
const router = express.Router()
const { createCourse, getCourse, updateCourse, deleteCourse, getAllCourses } = require('../controllers/course')

router.post('/', createCourse)
router.get('/:id', getCourse)
router.put('/:id', updateCourse)
router.delete('/:id', deleteCourse)
router.get("/",getAllCourses)

module.exports = router
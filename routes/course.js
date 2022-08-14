/* Importing the express module. */
const express = require('express')
/* Creating a new router object. */
const router = express.Router()
/* Importing the functions from the course controller. */
const { createCourse, getCourse, updateCourse, deleteCourse, getAllCourses } = require('../controllers/course')

/* Creating a new route for the post request. */
router.post('/', createCourse)
/* Creating a new route for the get request. */
router.get('/:id', getCourse)
/* Updating the course. */
router.put('/:id', updateCourse)
/* Deleting the course. */
router.delete('/:id', deleteCourse)
/* Creating a new route for the get request. */
router.get("/",getAllCourses)

/* Exporting the router object. */
module.exports = router
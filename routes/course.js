const express = require('express');
const router = express.Router();
const { createCourse, getCourse, updateCourse, deleteCourse } = require('../controllers/course');

router.post('/', createCourse);
router.get('/:id', getCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);


module.exports = router;
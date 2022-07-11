const Course = require('../models/Course.js')

const createCourse = async (req, res) => {

    const { quarter, year, schedule, professor, subject, approved, failed, dropped } = req.body

    if (!(quarter || year || schedule || professor || subject || approved || failed || dropped)) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }
    if (quarter.length > 1 || year.length > 4 || schedule.length > 10 || professor.length > 1 || subject.length > 1 ||
        approved.length > 2 || failed.length > 2 || dropped.length > 2) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const course = new Course()

    course.createCourse(quarter, year, schedule, professor, subject, approved, failed, dropped, req.user.id.id)
        .then(() => {
            res.status(201).json({ msg: 'Curso creado' })
        }).catch(() => {
            res.status(409).json({ msg: 'Curso ya existe' })
        })
}

const getCourse = async (req, res) => {
    const { id } = req.params
    const { option } = req.query
    
    if (!(id || option)) {
        return res.status(400).json({ msg: 'Por favor brindar todo los valores' })
    }

    switch (option) {
        case "approved":
            break
        case "failed":
            break
        case "dropped":
            break
        default:
            return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const course = new Course()

    course.getCourse(id, option).then(data => {
        res.status(200).json(data)
    })
        .catch(() => {
            res.status(404).json({ msg: 'No hay datos' })
        })
}
module.exports = { createCourse, getCourse }
const Subject = require('../models/Subject.js')

const createSubject = async (req, res) => {
    const subject = new Subject()
    const { name, code } = req.body

    if (!(name || code)) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }
    if (name.length > 45 || code.length > 45) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    subject.createSubject(name, code, req.user.id.id)
        .then(() => {
            res.status(201).json({ msg: 'Materia creada' })
        })
        .catch(() => {
            res.status(409).json({ msg: 'Materia ya existe' })
        })

}

const getSubjects = async (req, res) => {

    const subject = new Subject()
    subject.getSubjects()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch(() => {
            res.status(404).json({ msg: 'No hay registros' })
        })
}

module.exports = { createSubject, getSubjects }
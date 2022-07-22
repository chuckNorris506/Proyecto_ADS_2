const Subject = require('../models/Subject.js');

const createSubject = async (req, res) => {

    const { name, code } = req.body

    if (!name || !code) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (name.length > 45 || code.length > 45) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const subject = new Subject()

    subject.createSubject(name.trim(), code.trim(), req.user.id.id.trim())
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

const updateSubject = (req, res) => {

    const { id } = req.params
    const { name, code } = req.body

    if (!name || !code) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (name.length > 45 || code.length > 45 || isNaN(id)) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const subject = new Subject()

    subject.updateSubject(id.trim(), name.trim(), code.trim())
        .then(() => {
            res.status(200).json({ msg: 'Materia actualizada' })
        }).catch(() => {
            return res.status(400).json({ msg: 'Error actualizando materia' })
        })
}

const deleteSubject = (req, res) => {

    const { id } = req.params

    if (!id) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (isNaN(id)) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const subject = new Subject()

    subject.deleteSubject(id.trim())
        .then(() => {
            res.status(200).json({ msg: 'Materia eliminada' })
        })
        .catch(() => {
            return res.status(400).json({ msg: 'Error eliminando materia' })
        })
}

module.exports = { createSubject, getSubjects, updateSubject, deleteSubject };
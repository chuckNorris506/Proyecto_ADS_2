/* Importing the Subject class from the Subject.js file. */
const Subject = require('../models/Subject.js');

/**
 * It creates a new subject and saves it to the database.
 * @param req - the request object
 * @param res - the response object
 * @returns An array of objects.
 */
const createSubject = async (req, res) => {

    const { name, code } = req.body

    if (!name || !code) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (name.length > 45 || code.length > 45) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const subject = new Subject()

    subject.createSubject(name.trim(), code.trim(), req.user.id.id)
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

/**
 * It updates a subject in the database.
 * @param req - request
 * @param res - the response object
 * @returns A promise
 */
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

/**
 * It deletes a subject from the database.
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - the response object
 * @returns The result of the query.
 */
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

/* Exporting the functions to be used in the routes. */
module.exports = { createSubject, getSubjects, updateSubject, deleteSubject };
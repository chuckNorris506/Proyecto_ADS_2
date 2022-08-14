/* Importing the Professor class from the Professor.js file. */
const Professor = require('../models/Professor.js');

/**
 * It creates a professor.
 * @param req - the request object
 * @param res - the response object
 * @returns A promise
 */
const createProfessor = async (req, res) => {

    const { fullname, identification } = req.body

    if (!fullname || !identification) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (fullname.length > 45 || identification.length > 45) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const professor = new Professor()

    professor.createProfessor(fullname.trim(), identification.trim(), req.user.id.id)
        .then(() => {
            res.status(201).json({ msg: 'Profesor creado' })
        })
        .catch(() => {
            res.status(409).json({ msg: 'Profesor ya existe' })
        })

}

/**
 * It's a function that gets all the professors from the database.
 * @param req - The request object.
 * @param res - the response object
 */
const getProfessors = async (req, res) => {

    const professor = new Professor()

    professor.getProfessors()
        .then((data) => {
            res.status(200).json(data)
        }).catch(() => {
            res.status(404).json({ msg: 'No hay registros' })
        })

}

/**
 * It updates a professor's information in the database.
 * @param req - request
 * @param res - the response object
 * @returns A function that takes two parameters, req and res.
 */
const updateProfessor = (req, res) => {

    const { id } = req.params
    const { fullname, identification } = req.body

    if (!fullname || !identification) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (fullname.length > 45 || identification.length > 45 || isNaN(id)) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const professor = new Professor()

    professor.updateProfessor(id.trim(), fullname.trim(), identification.trim())
        .then(() => {
            res.status(200).json({ msg: 'Profesor actualizado' })
        }).catch(() => {
            return res.status(400).json({ msg: 'Error actualizando profesor' })
        })
}

/**
 * It deletes a professor from the database
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - the response object
 * @returns The professor object is being returned.
 */
const deleteProfessor = (req, res) => {

    const { id } = req.params

    if (!id) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (isNaN(id)) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const professor = new Professor()

    professor.deleteProfessor(id.trim())
        .then(() => {
            res.status(200).json({ msg: 'Profesor eliminado' })
        })
        .catch(() => {
            return res.status(400).json({ msg: 'Error eliminando profesor' })
        })
}

/* Exporting the functions. */
module.exports = { createProfessor, getProfessors, updateProfessor, deleteProfessor }
const Professor = require('../models/Professor.js')

const createProfessor = async (req, res) => {

    const { fullname, identification } = req.body

    if (!(fullname || identification)) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }
    if (fullname.length > 45 || identification.length > 45) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const professor = new Professor()
    professor.createProfessor(fullname, identification, req.user.id.id)
        .then(() => {
            res.status(201).json({ msg: 'Profesor creado' })
        })
        .catch(() => {
            res.status(409).json({ msg: 'Profesor ya existe' })
        })

}

const getProfessors = async (req, res) => {
    const professor = new Professor()
    professor.getProfessors().then((data) => {
        res.status(200).json(data)
    }).catch(() => {
        res.status(404).json({ msg: 'No hay registros' })
    })

}

const updateProfessor = (req, res) => { }

const deleteProfessor = (req, res) => { }

module.exports = { createProfessor, getProfessors, updateProfessor, deleteProfessor }
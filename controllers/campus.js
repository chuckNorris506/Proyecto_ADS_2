const Campus = require('../models/Campus')

const getCampuses = (req, res) => {
    const campus = new Campus()
    campus.getCampuses().then((data) => {
        res.status(200).json(data)
    }).catch(() => {
        res.status(404).json({ msg: 'No hay registros' })
    })
}

module.exports = { getCampuses }
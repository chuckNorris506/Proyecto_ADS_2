const Alert = require('../models/Alert.js')

const getAlerts = (req, res) => {
    const alert = new Alert()
    alert.getAlerts().then((data) => {
        res.status(200).json(data)
    }).catch(() => {
        res.status(404).json({ msg: 'No hay registros' })
    })
}

module.exports = { getAlerts }
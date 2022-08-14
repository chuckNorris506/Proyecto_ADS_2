/* It's importing the Alert class from the Alert.js file. */
const Alert = require('../models/Alert.js')

/**
 * It's a function that gets alerts from a database and returns them in JSON format.
 * @param req - The request object.
 * @param res - the response object
 */
const getAlerts = (req, res) => {

    const alert = new Alert()

    alert.getAlerts()
        .then((data) => {
            res.status(200).json(data)
        }).catch(() => {
            res.status(404).json({ msg: 'No hay registros' })
        })
}

/* It's exporting the `getAlerts` function. */
module.exports = { getAlerts }
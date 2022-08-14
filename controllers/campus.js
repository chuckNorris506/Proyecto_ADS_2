/* It's importing the Campus model. */
const Campus = require('../models/Campus')

/**
 * It's a function that gets all the campuses from the database and returns them in a JSON format.
 * @param req - The request object.
 * @param res - The response object.
 */
const getCampuses = (req, res) => {

    const campus = new Campus()

    campus.getCampuses()
        .then((data) => {
            res.status(200).json(data)
        }).catch(() => {
            res.status(404).json({ msg: 'No hay registros' })
        })
}

/* It's exporting the function `getCampuses` so it can be used in other files. */
module.exports = { getCampuses }
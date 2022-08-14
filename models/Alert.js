/* Importing the database connection file. */
const database = require('../database/dbConnect')

class Alert {
    /* Defining the properties of the class. */
    id
    approvedDiff
    failedDiff
    droppedDiff

    /* A function that returns a promise. */
    getAlerts = async () => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection()
            connection.execute('CALL get_alerts()',
                (err, results, fields) => {
                    if (err) {
                        reject()
                    }
                    else {
                        results.pop()
                        if (results[0].length < 1) {
                            return reject()
                        }
                        resolve(results[0])
                    }
                })
            connection.end()
        })
    }

}

/* Exporting the class to be used in other files. */
module.exports = Alert
const database = require('../database/dbConnect')

class Alert {
    id
    courseVarianceApproved
    courseVarianceFailed
    courseVarianceDropped

    getAlerts = async () => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
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
        })
    }

}

module.exports = Alert
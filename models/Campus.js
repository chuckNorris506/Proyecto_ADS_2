/* It's importing the file dbConnect.js from the folder database. */
const database = require('../database/dbConnect')

class Campus {
    /* It's a class property. */
    id
    name

    /* It's a class method. */
    getCampuses = async () => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection()
            connection.execute('CALL get_campuses()',
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

/* It's exporting the class Campus to be used in other files. */
module.exports = Campus
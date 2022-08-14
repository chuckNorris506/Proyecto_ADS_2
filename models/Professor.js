/* Importing the database connection. */
const database = require('../database/dbConnect')

class Professor {

    /* A class property. */
    id
    fullName
    identification
    createdBy
    status

    /* A function that creates a professor. */
    createProfessor = async (fullName, identification, id) => {
        return new Promise((resolve, reject) => {
            this.findProfessor(identification)
                .then(() => {
                    const connection = database.getConnnection();
                    connection.execute('CALL create_professor(?,?,?)',
                        [fullName, identification, id],
                        (err, results, fields) => {
                            if (err) {
                                reject()
                            }
                            else {
                                resolve()
                            }
                        })
                    connection.end()
                })
                .catch(() => {
                    reject()
                })
        })

    }

    /* A function that gets all the professors from the database. */
    getProfessors = async () => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL get_professors()',
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

    /* Updating the professor. */
    updateProfessor = async (id, fullname, identification) => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL update_professor(?,?,?)',
                [id, fullname, identification],
                (err, results, fields) => {
                    if (err) {
                        reject()
                    }
                    else {
                        resolve()
                    }
                })
            connection.end()
        })
    }

    /* Deleting a professor from the database. */
    deleteProfessor = async (id) => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL delete_professor(?)',
                [id],
                (err, results, fields) => {
                    if (err) {
                        reject()
                    }
                    else {
                        resolve()
                    }
                })
            connection.end()
        })
    }

    /**
     * It checks if a professor exists in the database
     * @param identification - string
     * @returns The results of the query.
     */
    async findProfessor(identification) {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL find_professor(?)',
                [identification],
                (err, results, fields) => {
                    if (err) {
                        reject()
                    }
                    else {
                        results.pop()
                        if (results[0].length < 1) {
                            return resolve()
                        }
                        reject()
                    }
                })
            connection.end()
        })
    }
}
/* Exporting the class so that it can be used in other files. */
module.exports = Professor
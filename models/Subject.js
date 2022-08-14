/* Importing the database connection file. */
const database = require('../database/dbConnect')

class Subject {

    /* A class variable. */
    id
    name
    code
    createdBy
    status

    /* A function that creates a subject in the database. */
    createSubject = async (name, code, id) => {
        return new Promise((resolve, reject) => {
            this.findSubject(code)
                .then(() => {
                    const connection = database.getConnnection();
                    connection.execute('CALL create_subject(?,?,?)',
                        [name, code, id],
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

    /* A function that returns a promise. */
    getSubjects = async () => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL get_subjects()',
                (err, results, fields) => {
                    if (err) {
                        reject()
                    }
                    else {
                        results.pop()
                        if (results[0].length < 1) {
                            reject()
                        }
                        resolve(results[0])
                    }
                })
            connection.end()
        })
    }

    /* Updating the subject in the database. */
    updateSubject = async (id, name, code) => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL update_subject(?,?,?)',
                [id, name, code],
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

    /* Deleting a subject from the database. */
    deleteSubject = async (id) => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL delete_subject(?)',
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
     * It checks if a subject exists in the database
     * @param code - the code of the subject
     * @returns A promise that resolves if the subject does not exist, and rejects if it does.
     */
    async findSubject(code) {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL find_subject(?)',
                [code],
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

/* Exporting the class Subject to be used in other files. */
module.exports = Subject
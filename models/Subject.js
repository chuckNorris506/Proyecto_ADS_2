const database = require('../database/dbConnect')

class Subject {

    id
    name
    code
    createdBy
    status

    createSubject = async (name, code, id) => {
        return new Promise((resolve, reject) => {
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
        })

    }

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
        })
    }

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
        })
    }

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
        })
    }

}

module.exports = Subject
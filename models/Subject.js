const database = require('../database/dbConnect')

class Subject {

    id
    name
    code
    createdBy

    createSubject = async (name, code, u_id) => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL create_subject(?,?,?)',
                [name, code, u_id],
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
}

module.exports = Subject
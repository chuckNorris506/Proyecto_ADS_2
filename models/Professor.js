const database = require('../database/dbConnect')

class Professor {

    id 
    fullName
    identification
    createdBy

    createProfessor = async (fullName, identification, id) => {
        return new Promise((resolve, reject) => {
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
        })

    }

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
        })
    }
}

module.exports = Professor
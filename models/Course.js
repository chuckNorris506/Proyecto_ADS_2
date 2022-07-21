const database = require('../database/dbConnect')

class Course {

    id
    subject
    professor
    schedule
    quarter
    year
    studentsApproved
    studentsFailed
    studentsDropped
    createdBy
    status

    createCourse = async (subject, professor, campus, schedule, quarter, year, approved, failed, dropped, id) => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL create_course(?,?,?,?,?,?,?,?,?,?)',
                [subject, professor, campus, schedule, quarter, year, approved, failed, dropped, id],
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

    getCourse = async (id, campus, option) => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL get_course(?,?,?)',
                [id, campus, option],
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

    updateCourse = async (id, subject, campus, professor, schedule, quarter, year, approved, failed, dropped) => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL update_course(?,?,?,?,?,?,?,?,?,?)',
                [id, subject, professor, campus, schedule, quarter, year, approved, failed, dropped],
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

    deleteCourse = async (id) => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL delete_course(?)',
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
}

module.exports = Course
const database = require('../database/dbConnect')

class Course {

    /* A class variable. */
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

    /* Creating a course. */
    createCourse = async (subject, professor, campus, schedule, quarter, year, approved, failed, dropped, id) => {
        return new Promise((resolve, reject) => {
            this.findCourse(subject, professor, campus, schedule, quarter, year)
                .then(() => {
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
                .catch(() => {
                    reject();
                })
        })

    }

    /* A function that is called when the user wants to get a course. */
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

    /* Updating the course. */
    updateCourse = async (id, subject, professor, campus, schedule, quarter, year, approved, failed, dropped) => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL update_course(?,?,?,?,?,?,?,?,?,?)',
                [id, subject, professor, campus, schedule, quarter, year, approved, failed, dropped],
                (err, results, fields) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(err)
                    }
                })
            connection.end()
        })
    }

    /* Deleting a course. */
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

    /* A function that is called when the user wants to get all the courses. */
    getAllCourses = async () => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL get_all_courses()',
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

    /**
     * It takes in 6 parameters, and returns a promise that resolves if the query returns no results,
     * and rejects if the query returns results.
     * 
     * I'm trying to test this function using Jest, but I'm having trouble figuring out how to test the
     * promise.
     * 
     * Here's what I have so far:
     * @param subject - string
     * @param professor - "John Doe"
     * @param campus - "Seattle"
     * @param schedule - "MWF"
     * @param quarter - "Winter"
     * @param year - 2019
     * @returns The results of the query.
     */
    async findCourse(subject, professor, campus, schedule, quarter, year) {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL find_course(?,?,?,?,?,?)',
                [subject, professor, campus, schedule, quarter, year],
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

module.exports = Course
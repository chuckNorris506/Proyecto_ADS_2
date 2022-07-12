const database = require('../database/dbConnect');

class Course {

    id;
    subject;
    professor;
    schedule;
    quarter;
    year;
    studentsApproved;
    studentsFailed;
    studentsDropped;
    createdBy;
    status;

    createCourse = async (subject, professor, schedule, quarter, year, approved, failed, dropped, id) => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL create_course(?,?,?,?,?,?,?,?,?)',
                [subject, professor, schedule, quarter, year, approved, failed, dropped, id],
                (err, results, fields) => {
                    if (err) {
                        reject()
                    }
                    else {
                        resolve()
                    }
                })
        })

    };

    getCourse = async (id, option) => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL get_course(?,?)',
                [id, option],
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
    };

    updateCourse = async (id, subject, professor, schedule, quarter, year, approved, failed, dropped) => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL update_course(?,?,?,?,?,?,?,?,?)',
                [id, subject, professor, schedule, quarter, year, approved, failed, dropped],
                (err, results, fields) => {
                    if (err) {
                        reject()
                    }
                    else {
                        resolve()
                    }
                })
        })
    };

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
        })
    };
};

module.exports = Course;
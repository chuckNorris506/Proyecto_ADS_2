const database = require('../database/dbConnect')
const { createJWT, JWTResetPassword } = require('../middleware/authenticate')

class User {

    id
    fullName
    username
    password

    async login(username, password) {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL login(?,?)',
                [username, password],
                (err, results, fields) => {
                    if (results[0][0]) {
                        this.id = results[0][0]
                        return resolve(createJWT(this.id))
                    }
                    else {
                        reject()
                    }
                })
            connection.end()
        })
    }

    async register(fullName, username, password) {
        return new Promise((resolve, reject) => {
            this.findUser(username)
                .then(() => {
                    const connection = database.getConnnection();
                    connection.execute('CALL register(?,?,?)',
                        [fullName, username, password],
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

    async updateUser(id, fullName, username) {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL update_user(?,?,?)',
                [id, fullName, username],
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

    async deleteUser(id) {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL delete_user(?)',
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

    getUsers = async () => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL get_users()',
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

    resetPassword = async (id, password) => {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL update_password(?,?)',
                [id, password],
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

    async getUserByEmail(username) {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL get_user_by_email(?)',
                [username],
                (err, results, fields) => {
                    if (results[0] != "") {
                        this.id = results[0]
                        return resolve(JWTResetPassword(this.id))
                    }
                    else {
                        reject()
                    }
                })
            connection.end()
        })
    }

    async findUser(username) {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL find_user(?)',
                [username],
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

module.exports = User
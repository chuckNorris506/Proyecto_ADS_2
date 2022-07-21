const database = require('../database/dbConnect')
const { createJWT } = require('../middleware/authenticate')

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
        })
    }

    async register(fullName, username, password) {
        return new Promise((resolve, reject) => {
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
        })
    }

    async updateUser(id, fullName, username, password) {

        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL update_user(?,?,?,?)',
                [id, fullName, username, password],
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

}

module.exports = User
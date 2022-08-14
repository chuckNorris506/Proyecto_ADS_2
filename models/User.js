/* Importing the database connection file. */
const database = require('../database/dbConnect')
/* Importing the functions from the authenticate.js file. */
const { createJWT, JWTResetPassword } = require('../middleware/authenticate')

class User {

    /* A class property. */
    id
    fullName
    username
    password

    /**
     * It takes a username and password, and returns a JWT if the username and password are correct.
     * @param username - the username of the user
     * @param password - the password to be hashed
     * @returns A promise that resolves to a JWT token.
     */
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

    /**
     * It checks if the username is already taken, if it is, it rejects the promise, if it isn't, it
     * calls the register procedure and resolves the promise.
     * @param fullName - The full name of the user
     * @param username - the username of the user
     * @param password - the password that the user entered
     * @returns A promise that resolves or rejects based on the result of the query.
     */
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

    /**
     * It updates a user's full name and username in the database
     * @param id - the id of the user to update
     * @param fullName - String
     * @param username - the username of the user to be updated
     * @returns A promise.
     */
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

    /**
     * It deletes a user from the database.
     * @param id - the id of the user to be deleted
     * @returns A promise.
     */
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

    /* A function that returns a promise. */
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

    /* A function that takes an id and a password, and updates the password of the user with the given
    id. */
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

    /**
     * It takes a username, checks if it exists in the database, if it does, it returns a JWT token.
     * @param username - the email of the user
     * @returns A promise.
     */
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

    /**
     * It takes a username as a parameter, and returns a promise that resolves if the username is not
     * found in the database, and rejects if it is found.
     * 
     * The function is called like this:
     * @param username - the username of the user to be found
     * @returns A promise that resolves if the user is not found and rejects if the user is found.
     */
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

/* Exporting the User class so that it can be imported in other files. */
module.exports = User
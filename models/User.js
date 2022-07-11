const database = require('../database/dbConnect')
const { createJWT } = require('../middleware/authenticate');

class User {

    id
    fullName
    username
    password

    async login(username, password) {
        return new Promise((resolve, reject) => {
            const connection = database.getConnnection();
            connection.execute('CALL login(?,?)', [username, password], (err, results, fields) => {
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

}

module.exports = User
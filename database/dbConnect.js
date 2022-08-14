/* Importing the mysql2 module. */
const mysql = require('mysql2')

/**
 * It creates a connection to the database using the environment variables.
 * @returns A connection object.
 */
const getConnnection = () => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })

    return connection
}

/* Exporting the `getConnnection` function. */
module.exports = { getConnnection }
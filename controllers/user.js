/* Importing the User class from the models folder. */
const User = require('../models/User')
/* Importing the transporter object from the forgotPassword.js file. */
const { transporter } = require('../mail/forgotPassword')
/* Importing the jsonwebtoken library. */
const jwt = require('jsonwebtoken')

/**
 * It sends an email to the user with a link to reset their password.
 * @param req - The request object.
 * @param res - the response object
 */
const sendMail = async (req, res) => {

    const user = new User()
    const { to } = req.body

    user.getUserByEmail(to)
        .then(jwt => {
            const options = {
                to,
                from: process.env.EMAIL_USER,
                subject: "Cambio de contraseña",
                text: "Si desea cambiar de contraseña dele click al siguiente link https://localhost:"
                    + process.env.SERVER_PORT + "/reset-password/" + jwt,
            }
            transporter.sendMail(options, function (err, info) {
                if (err) {
                    res.status(502).json({ msg: "Error enviando correo" })
                }
                res.status(201).json({ msg: "Correo enviado", token: jwt })
            });
        }).catch(() => {
            res.status(400).json({ msg: "Email no válido:" })
        })
};

/**
 * It takes a username and password from a request body, validates them, and then sends them to a login
 * function in a User class.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise.
 */
const login = async (req, res) => {

    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(username) || !username.endsWith('ulatina.net')) {
        return res.status(400).json({ msg: 'Por favor brindar email válido' })
    }

    if (username.length > 45 || password.length > 45) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const user = new User()

    user.login(username.trim(), password.trim())
        .then(jwt => {
            res.status(200).json({ token: jwt })
        }).catch(() => {
            return res.status(401).json({ msg: 'Credenciales inválidas' })
        })
};

/**
 * It takes the request body, checks if the values are valid, and then creates a new user.
 * @param req - The request object. This is an object that represents the HTTP request and has
 * properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param res - the response object
 * @returns The user is being returned.
 */
const register = async (req, res) => {

    const { fullName, username, password } = req.body

    if (!fullName || !username || !password) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(username) || !username.endsWith('ulatina.net')) {
        return res.status(400).json({ msg: 'Por favor brindar email válido' })
    }

    if (fullName.length > 45 || username.length > 45 || password.length > 45) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const user = new User()

    user.register(fullName.trim(), username.trim(), password.trim())
        .then(() => {
            res.status(201).json({ msg: 'Usuario creado' })
        }).catch(() => {
            res.status(409).json({ msg: 'Usuario ya existe' })
        })

}

/**
 * It updates a user's full name and username in the database.
 * @param req - The request object.
 * @param res - the response object
 * @returns A promise
 */
const updateUser = async (req, res) => {

    const { id } = req.params
    const { fullName, username } = req.body

    if (!fullName || !username) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(username) || !username.endsWith('ulatina.net')) {
        return res.status(400).json({ msg: 'Por favor brindar email válido' })
    }

    if (fullName.length > 45 || username.length > 45 || isNaN(id)) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const user = new User()

    user.updateUser(id.trim(), fullName.trim(), username.trim())
        .then(() => {
            res.status(200).json({ msg: 'Usuario actualizado' })
        }).catch(() => {
            return res.status(400).json({ msg: 'Error actualizando usuario' })
        })
}

/**
 * It deletes a user from the database.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The result of the query.
 */
const deleteUser = async (req, res) => {

    const { id } = req.params

    if (!id) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (isNaN(id)) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const user = new User()

    user.deleteUser(id.trim())
        .then(() => {
            res.status(200).json({ msg: 'Usuario eliminado' })
        })
        .catch(() => {
            return res.status(400).json({ msg: 'Error eliminando usuario' })
        })
}

/**
 * It's a function that gets all the users from the database and returns them in a JSON format.
 * @param req - The request object.
 * @param res - The response object.
 */
const getUsers = async (req, res) => {

    const user = new User()

    user.getUsers()
        .then((data) => {
            res.status(200).json(data)
        }).catch(() => {
            res.status(404).json({ msg: 'No hay registros' })
        })
}

/**
 * It takes the id from the url, the password from the body, verifies the id, and then updates the
 * password.
 * @param req - request
 * @param res - the response object
 * @returns {
 *     "msg": "Error actualizando contraseña"
 * }
 */
const resetPassword = async (req, res) => {
    const user = new User()

    const { id } = req.params
    const { password } = req.body

    if (!password) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (password.length > 45) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    jwt.verify(id, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(404).send('<h1>Recurso no encontrado...</h1>')
        }
        else {
            const idToken = decoded.id.map(a => a.u_id).toString()
            
            user.resetPassword(idToken.trim(), password.trim())
                .then(() => {
                    res.status(200).json({ msg: 'Contraseña actualizada' })
                }).catch(() => {
                    return res.status(400).json({ msg: 'Error actualizando contraseña' })
                })
        }
    })
}


/* It's exporting the functions to be used in the routes. */
module.exports = { login, register, updateUser, deleteUser, getUsers, sendMail, resetPassword };
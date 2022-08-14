/* Importing the jsonwebtoken library. */
const jwt = require('jsonwebtoken')

/**
 * It takes the token from the request header, verifies it, and if it's valid, it adds the user id to
 * the request object.
 * @param req - The request object.
 * @param res - the response object
 * @param next - The next middleware function in the stack.
 * @returns The token is being returned.
 */
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(400).json({ alert: "Por favor brindar token" })
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ alert: "Acceso no autorizado" })
        }
        else {
            req.user = { id: decoded.id }
            return next()
        }
    })

}

/**
 * It takes the token from the URL, verifies it, and if it's valid, redirects the user to the
 * reset-password.html page.
 * @param req - the request object
 * @param res - the response object
 */
const authenticateResetPassword = async (req, res) => {
    const token = req.params
    jwt.verify(Object.values(token).toString(), process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(404).send('<h1>Recurso no encontrado...</h1>')
        }
        else {
            res.redirect('https://localhost:' + process.env.SERVER_PORT + '/reset-password.html')
        }
    })
}

/**
 * It creates a JWT token with the user's id as the payload and the secret key as the signature.
 * @param id - the user id
 * @returns A promise that resolves to a JWT token.
 */
const createJWT = async (id) => {
    return new Promise((resolve, reject) => {
        resolve(jwt.sign({ id }, process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_LIFETIME }))
    })
}

/**
 * This function returns a promise that resolves to a JWT token that expires in 1 hour.
 * @param id - the user id
 * @returns A promise that resolves to a JWT token.
 */
const JWTResetPassword = async (id) => {
    return new Promise((resolve, reject) => {
        resolve(jwt.sign({ id }, process.env.JWT_SECRET,
            { expiresIn: process.env.JWTResetPassword_LIFETIME }))
    })
}

/* Exporting the functions so that they can be used in other files. */
module.exports = { authenticate, createJWT, JWTResetPassword, authenticateResetPassword }
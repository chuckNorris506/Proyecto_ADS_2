const jwt = require('jsonwebtoken')

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

const createJWT = async (id) => {
    return new Promise((resolve, reject) => {
        resolve(jwt.sign({ id }, process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_LIFETIME }))
    })
}

const JWTResetPassword = async (id) => {
    return new Promise((resolve, reject) => {
        resolve(jwt.sign({ id }, process.env.JWT_SECRET,
            { expiresIn: process.env.JWTResetPassword_LIFETIME }))
    })
}

module.exports = { authenticate, createJWT, JWTResetPassword, authenticateResetPassword }
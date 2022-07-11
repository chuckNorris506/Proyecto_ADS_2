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

const createJWT = async (id) => {
    return new Promise((resolve, reject) => {
        resolve(jwt.sign({id}, process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_LIFETIME }))
    })
}

module.exports = { authenticate, createJWT }
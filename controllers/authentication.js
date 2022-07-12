const User = require('../models/User');

const login = async (req, res) => {

    const { username, password } = req.body

    if (!(username || password)) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (username.length > 45 || password.length > 45) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const user = new User()

    user.login(username, password)
        .then(jwt => {
            res.status(200).json({ token: jwt })
        }).catch(() => {
            res.status(401).json({ msg: 'Credenciales inválidas' })
        })
};

module.exports = login;
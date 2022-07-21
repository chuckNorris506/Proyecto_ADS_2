const User = require('../models/User')

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

const register = async (req, res) => {
    const { fullName, username, password } = req.body

    if (!(fullName || username || password)) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (!username.includes('@ulatina.net')) {
        return res.status(400).json({ msg: 'Por favor brindar email válido' })
    }

    if (fullName.length > 45 || username.length > 45 || password.length > 45) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const user = new User()

    user.register(fullName, username, password)
        .then(() => {
            res.status(201).json({ msg: 'Usuario creado' })
        }).catch(() => {
            res.status(409).json({ msg: 'Usuario ya existe' })
        })

}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { fullName, username, password } = req.body

    if (!(id || fullName || username || password)) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (fullName.length > 45 || username.length > 45 || password.length > 45 || isNaN(id)) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const user = new User()

    user.updateUser(id, fullName, username, password)
        .then(() => {
            res.status(200).json({ msg: 'Usuario actualizado' })
        }).catch(() => {
            return res.status(400).json({ msg: 'Error actualizando usuario' })
        })
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    const user = new User()
    user.deleteUser(id).then(() => {
        res.status(200).json({ msg: 'Usuario eliminado' })
    })
        .catch(() => {
            return res.status(400).json({ msg: 'Error eliminando usuario' })
        })
}

module.exports = { login, register, updateUser, deleteUser };
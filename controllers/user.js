const User = require('../models/User')

const login = async (req, res) => {

    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (!username.includes('@ulatina.net')) {
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
            res.status(401).json({ msg: 'Credenciales inválidas' })
        })
};

const register = async (req, res) => {

    const { fullName, username, password } = req.body

    if (!fullName || !username || !password) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (!username.includes('@ulatina.net')) {
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

const updateUser = async (req, res) => {

    const { id } = req.params
    const { fullName, username, password } = req.body

    if (!fullName || !username || !password) {
        return res.status(400).json({ msg: 'Por favor brindar todos los valores' })
    }

    if (!username.includes('@ulatina.net')) {
        return res.status(400).json({ msg: 'Por favor brindar email válido' })
    }

    if (fullName.length > 45 || username.length > 45 || password.length > 45 || isNaN(id)) {
        return res.status(400).json({ msg: 'Por favor brindar valores válidos' })
    }

    const user = new User()

    user.updateUser(id.trim(), fullName.trim(), username.trim(), password.trim())
        .then(() => {
            res.status(200).json({ msg: 'Usuario actualizado' })
        }).catch(() => {
            return res.status(400).json({ msg: 'Error actualizando usuario' })
        })
}

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

const getUsers = async (req, res) => {

    const user = new User()

    user.getUsers()
        .then((data) => {
            res.status(200).json(data)
        }).catch(() => {
            res.status(404).json({ msg: 'No hay registros' })
        })

}

module.exports = { login, register, updateUser, deleteUser, getUsers };
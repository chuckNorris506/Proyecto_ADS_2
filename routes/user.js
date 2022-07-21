const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/authenticate')
const {login, register, updateUser, deleteUser} = require('../controllers/user')

router.post('/login', login)
router.post('/register', authenticate, register)
router.put('/:id', authenticate, updateUser)
router.delete('/:id', authenticate, deleteUser)

module.exports = router
const express = require('express')
const router = express.Router()
const {authenticate} = require('../middleware/authenticate')
const {login, register, updateUser, deleteUser, getUsers, sendMail, resetPassword} = require('../controllers/user')


router.post('/forgot-password',sendMail)
router.post('/login', login)
router.post('/register', authenticate, register)
router.put('/:id', authenticate, updateUser)
router.delete('/:id', authenticate, deleteUser)
router.get('/',getUsers)
router.put('/reset-password/:id', resetPassword)


module.exports = router
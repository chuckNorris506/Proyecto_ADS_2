const express = require('express')
const router = express.Router()
const { getAlerts } = require('../controllers/alert')

router.get('/', getAlerts)

module.exports = router
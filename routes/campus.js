const express = require('express');
const router = express.Router();
const { getCampuses } = require('../controllers/campus');

router.get('/', getCampuses);


module.exports = router;
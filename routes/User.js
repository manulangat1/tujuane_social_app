const express = require('express')
const {registerUser} = require('../controllers/User')

const router = express.Router()

router.route('/').post(registerUser)

module.exports = router
const express = require('express')
const {registerUser,confirmAccount,resetPassword,resendConfirm,loginUser} = require('../controllers/User')

const router = express.Router()

router.route('/').post(registerUser)
router.route('/confirmation/:token').get(confirmAccount)
router.route('/reset/').post(resetPassword)
router.route('/resend/').post(resendConfirm)
router.route('/login/').post(loginUser)

module.exports = router
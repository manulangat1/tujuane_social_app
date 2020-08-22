const express = require('express')
const {registerUser,confirmAccount,resetPassword,resendConfirm,loginUser,getuser,logOut, addFollower,addFollowing,whoTo} = require('../controllers/User')


const { isAuth } = require('../middleware/isAuth')
const { isActive } = require('../middleware/isActive')

const router = express.Router()

router.route('/').post(registerUser)
router.route('/confirmation/:token').get(confirmAccount)
router.route('/reset/').post(resetPassword)
router.route('/resend/').post(resendConfirm)
router.route('/login/').post(loginUser)
router.route('/follow/').put(isAuth,isActive,addFollowing)
router.route('/follower/').put(isAuth,isActive,addFollower)
router.route('/follow/user/').get(isAuth,isActive,whoTo)
router.route('/user/').get(isAuth,isActive, getuser)
router.route('/logout/').post(isAuth,isActive,logOut)

module.exports = router
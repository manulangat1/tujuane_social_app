const express = require('express')

const { addPost , getPosts } = require('../controllers/Post')

const { isAuth } = require('../middleware/isAuth')
const { isActive } = require('../middleware/isActive')

const router = express.Router()
router.route('/').get(isAuth,isActive,getPosts).post(isAuth,isActive, addPost)

module.exports = router
const express = require('express')

const { addPost , getPosts , updatePost,deletePost} = require('../controllers/Post')

const { isAuth } = require('../middleware/isAuth')
const { isActive } = require('../middleware/isActive')

const router = express.Router()
router.route('/').get(isAuth,isActive,getPosts).post(isAuth,isActive, addPost)
router.route('/:id/').put(isAuth,isActive,updatePost).delete(isAuth,isActive,deletePost)

module.exports = router
const express = require('express')

const { addPost , getPosts , updatePost,deletePost,newComment,getPostById} = require('../controllers/Post')

const { isAuth } = require('../middleware/isAuth')
const { isActive } = require('../middleware/isActive')

const router = express.Router()
router.route('/').get(isAuth,isActive,getPosts).post(isAuth,isActive, addPost)
router.route('/:id/').get(getPostById).put(isAuth,isActive,updatePost).delete(isAuth,isActive,deletePost)
router.route('/comment/').post(isAuth,isActive,newComment)

module.exports = router
const Post = require('../models/Post')
const mongoose = require('mongoose')


exports.addPost = async (req,res) => {
    try{
        const { body } = req.body
        const newPost = new Post ({
            user:req.user,
            body
        })
        await newPost.save()
        res.status(201).json({
            success:true,
            data:newPost
        })
    } catch (err){
        console.log(`Error is:${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
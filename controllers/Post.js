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

exports.getPosts = async (req,res) => {
    try{
        const posts = await Post.find()
        res.status(200).json({
            success:true,
            count:posts.length,
            data:posts
        })
    } catch (err){
        console.log(`Error is:${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

exports.updatePost = async (req,res) => {
    try{
        const _id = req.params.id
        const { body} = req.body
        const post = await Post.findById(_id)
        if (req.user === post.author){
            console.log("Hey..")
        } else {
            post.body = body 
        await post.save()
            res.status(201).json({
                success:true,
                data:post
            })
        }
        
    } catch (err){
        console.log(`Error is:${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
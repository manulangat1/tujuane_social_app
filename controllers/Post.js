const Post = require('../models/Post')
const mongoose = require('mongoose')


exports.addPost = async (req,res) => {
    try{
        const { body } = req.body
        const newPost = new Post ({
            author:req.user._id,
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
    const following = req.user.following 
    following.push(req.user._id)
    try{
        const posts = await Post.find({author:{$in:req.user.following}})
        // .populate('comments.postedBy', '_id name')
                .populate('author', '_id email username')
                .sort('-createdAt')
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

exports.deletePost = async(req,res) => {
    try{
        const _id = req.params.id
        const post = await Post.findById(_id)
        if (post.author = req.user._id){
            await post.remove()
            res.status(204).json({
                success:true,
                message:'Deletion Success'
            })
        } else {
            res.status(404).json({
                success:false,
                message:'Not found'
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


exports.newComment = async (req,res) => {
    // console.log(req.user._id)
    try {
        const {comment }= req.body
        comment.postedBy = req.user._id
        // console.log(comment)
        const commen = {
            text:comment,
            postedBy:req.user._id
        }
        console.log(commen)
        const newComment = await Post.findByIdAndUpdate(req.body.postId,{$push: {comments: commen}},
            {new: true})
            // .populate('comments.postedBy', '_id username')
            .populate('author', '_id username email')
        res.status(200).json({
            success:true,
            data:newComment
        })
    } catch (err){
        console.log(`Error is:${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
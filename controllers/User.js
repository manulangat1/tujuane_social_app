const User = require('../models/User')
const Token = require('../models/Token')
const  generateToken  = require('../helpers/generateAuthToken')
const sendemail = require('../utils/mailer')
const jwt = require('jsonwebtoken')


exports.registerUser = async (req,res) => {
    try{        
        const  { email,password,username,password2} = req.body
        if (password === password2){
            const user = new User({
                username:username,
                email:email,
                password:password
                
            })
            const token = await generateToken(user._id)
            await user.save()
            const mail = {
                    to:`${user.email}`,
                    subject: 'Account Verification Token',
                    html:'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth/v1/confirmation\/' + token + '.\n'
            }
            await sendemail(mail)
            res.status(201).json({
                success:true,
                message:'Verification Email sent to your email.Click on it to activate'
            })
        } else{
            res.status(400).json({
                success:false,
                message:'Passwords do not match'
            })
        }
    } catch (err){
        console.log(`Error:${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
exports.confirmAccount = async (req,res) => {
    try{
        const token = req.params.token
        const data = jwt.verify(token,process.env.JWT_KEY)
        const token_ = await Token.findOne({user:data._id})

        if (!token_){
            return res.status(400).json({
                success:false,
                message:'Token not found..'
            })
        } else{
            const userid = await token_.user
        const user =  await User.findOne({_id:userid})
        if (!user){
            res.status(400).json({
                success:false,
                message:'User not found..'
            })
        } else{
            user.isActive = true 
        await user.save()
        res.status(200).render('Confirm',{layout:false})
        }
        }
    } catch (err){
        console.log(`Error: ${err}`)
        res.status(500).render('500',{layout:false})
    }
}

exports.resetPassword = async (req,res) => {
    try{
        const { email,password,password2} = req.body
        if (password === password2){
            const user = await User.findOne({email})
        user.password = password 
        user.isActive = false
        const token = await generateToken(user._id)
        await user.save()
        const mail = {
            to:`${user.email}`,
            subject: 'Account Verification Token',
            html:'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth/v1/confirmation\/' + token + '.\n'
            }
            await sendemail(mail)
            res.status(200).json({
                success:true,
                message:'Verification Email sent to your email.Click on it to activate'
            })
        } else {
            res.status(400).json({
                success:false,
                message:'Passswords do not match'
            })
        }
        
    } catch (err){
        console.log(`Error: ${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
exports.resendConfirm = async(req,res) => {
    try{
        const { email} = req.body
            const user = await User.findOne({email})
        user.isActive = false
        const token = await generateToken(user._id)
        await user.save()
        const mail = {
            to:`${user.email}`,
            subject: 'Account Verification Token',
            html:'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth/v1/confirmation\/' + token + '.\n'
            }
            await sendemail(mail)
            res.status(200).json({
                success:true,
                message:'Verification Email sent to your email.Click on it to activate'
            })
        
    } catch (err){
        console.log(`Error: ${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

exports.loginUser = async (req,res) => {
    try{
        const { email,password} = req.body
        const user = await User.findByCredentials(email,password)
        if (user.isActive){
            const token = await  generateToken(user._id)

        res.status(200).json({
            success:true,
            user,
            token
        })
        } else {
            res.status(403).json({
                success:false,
                message:'Activate account to get started'
            })
        }
    } catch (err){
        console.log(`Error: ${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

exports.getuser = async (req,res) => {
    try{
        res.status(200).json({
            success:true,
            user:req.user
        })
    } catch (err)  {
        console.log(`Error: ${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

exports.logOut = async (req,res) => {
    try{
        const token = await Token.findOne({user:req.user})
        await token.remove()
        res.status(200).json({
            success:true,
            message:'Logout success'
        })
    } catch (err){
        console.log(`Error: ${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

exports.addFollowing = async (req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.user._id,{$push: {following: req.body.followId}})
        res.status(200).json({
            success:true,
            message:'User followed successfully'
        })
    } catch (err){
        console.log(`Error: ${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
exports.addFollower = async (req,res) => {
    try{
        const result = await User.findByIdAndUpdate(req.body.followId,
            {$push: {followers: req.body.userId}},
            {new: true})
            .populate('following', '_id name')
            .populate('followers', '_id name')
            res.status(200).json({
                success:true,
                message:'User followed successfully'
            })
    } catch (err) {
        console.log(`Error: ${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

//who to follow backend 

exports.whoTo = async (req,res) => {
    const following = req.user.following
    following.push(req.user._id)
    try{
        const users = await User.find({ _id:{ $nin : following }})
        .select('name')
        res.status(200).json({
            success:true,
            data:users
        })
    } catch (err) {
        console.log(`Error: ${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
const User = require('../models/User')
const  { generateToken } = require('../helpers/generateAuthToken')


exports.registerUser = async (req,res) => {
    try{
        const  { email,password,username,password2} = req.body
        if (password === password2){
            const user = new User({
                email,
                passsword,
                username
            })
            const token = generateToken(user._id)
            res.status(201).json({
                success:true,
                user,
                token
            })
        } else{
            console.log(`Error:${err}`)
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
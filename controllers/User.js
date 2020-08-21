const User = require('../models/User')
const  { generateToken } = require('../helpers/generateAuthToken')


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
            res.status(201).json({
                success:true,
                user,
                token
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
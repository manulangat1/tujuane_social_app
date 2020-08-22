const User = require('../models/User')
const Token = require('../models/Token')
const jwt = require('jsonwebtoken')


exports.isAuth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const data = jwt.verify(token,process.env.JWT_KEY)
        // console.log(token)
        const tokens = await Token.findOne({user:data._id})
        // console.log(tokens)

        const user = await User.findById(tokens.user)
        if (!user){
            res.status(401).json({
                success:false,
                message:'Invalid token'
            })
        } else{
            req.user = user 
            req.token = token 
            next()
        }

    } catch (err) {
        console.log(`Error:${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
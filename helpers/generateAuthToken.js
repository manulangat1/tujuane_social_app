const jwt = require('jsonwebtoken')
const Token = require('../models/Token')
const User = require('../models/User')


exports.generateToken = async (userId) => {
    try{
        const token = await Token.findOne({user:userId})
        newtoken = await jwt.sign({_id:userId},process.env.JWT_KEY)
        if (token){
         token.tokens = token.tokens.concat({newtoken})
         token.save()   
        } else {
            const newT = new Token({
                user:userId
            })
            newT.tokens.token = newtoken
            newT.save()
        }
    } catch (err){
        console.log(`Error:${err}`)
        res.status(400).json({
            success:false,
            message:'An error occured while authentication'
        })
    }
}
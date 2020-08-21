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
         return await newtoken
        } else {
            const newT = new Token({
                user:userId
            })
            newT.tokens.token = newtoken
            newT.save()
            return await newtoken
        }
    } catch (err){
        console.log(`Error:${err}`)
        console.log('Helper error')
    }
}
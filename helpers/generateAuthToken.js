const jwt = require('jsonwebtoken')
const Token = require('../models/Token')
const User = require('../models/User')


const generateToken = async (user) => {
    try{

        const tokenb = await Token.findOne({user:user})
        if (tokenb){
            const token = jwt.sign({_id:user},process.env.JWT_KEY)
            tokenb.tokens = tokenb.tokens.concat({token})
            await tokenb.save()
            return token
            
        } else{
            const tokena = jwt.sign({_id:user},process.env.JWT_KEY)
            const token = new Token({
                user:user,
                token:tokena
            })
            await token.save()
            return tokena 
        }
         
            
    } catch (err) {
        console.log(`Error:${err}`)
    }
}

module.exports = generateToken
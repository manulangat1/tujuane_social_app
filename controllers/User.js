const User = require('../models/User')
const  { generateToken } = require('../helpers/generateAuthToken')
const sendemail = require('../utils/mailer')


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
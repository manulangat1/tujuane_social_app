const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')



const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:false
    },
    friends:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    following: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    followers: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
})

UserSchema.pre('save', async function(next){
    const user = this 
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
})

UserSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    try {
        const user = await User.findOne({email})
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        return await user
    } catch (err){
        console.log(`Error :${err}`)
        res.status(400).json({
            success:false,
            message:'User not found'
        })
    }
}


const User = mongoose.model('User',UserSchema)
module.exports = User
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
    friends:{
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }
})

const User = mongoose.model('UserSchema',User)
module.exports = User
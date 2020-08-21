const mongoose = require('mongoose')



const TokenSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    tokens :[{
        token:{
            type:String,
            required:true
        }
    }],
    createdAt:{
        type:Date,
        required:true,
        default:Date.now,
        expires:43200
    }
})
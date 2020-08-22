const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    body:{
        type:String, 
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Post',PostSchema)
const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    body:{
        type:String, 
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    comments: [{
        text: {type:String},
        created: { type: Date, default: Date.now },
        postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
        }]
})

module.exports = mongoose.model('Post',PostSchema)
const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    try {
        const conn = await  mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
        console.log(`MongoDb connected on :${conn.connection.host}`.cyan.underline.bold)
    } catch (err){
        console.log(`Error is:${err}`.red.bold)
        process.exit(1)
    }
}
module.exports  = connectDB
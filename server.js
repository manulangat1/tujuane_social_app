const express =  require('express')
const colors =  require('colors')
const morgan =  require('morgan')
const path =  require('path')
const dotenv =  require('dotenv')
//importing and connecting to the db 
const connectDB = require('./config/db')

// load the config 
dotenv.config({path:'./config/config.env'})

const app = express()
connectDB()
//body parser 
app.use(express.json())
// set morgan 
if (process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}



//import routes 
const User = require('./routes/User')

app.use('/auth/v1/',User)
//set test 
app.get('/', (req,res) => res.send("Hello"))

const PORT = process.env.PORT

app.listen(PORT,console.log(`Tujuane running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline))
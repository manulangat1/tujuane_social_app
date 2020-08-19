const express =  require('express')
const colors =  require('colors')
const morgan =  require('morgan')
const path =  require('path')
const dotenv =  require('dotenv')

// load the config 
dotenv.config({path:'./config/config.env'})
const app = express()
// set morgan 
if (process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

//set test 
app.get('/', (req,res) => res.send("Hello"))

const PORT = process.env.PORT

app.listen(PORT,console.log(`Tujuane running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline))
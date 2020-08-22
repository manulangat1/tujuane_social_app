const express =  require('express')
const colors =  require('colors')
const morgan =  require('morgan')
const path =  require('path')
const dotenv =  require('dotenv')
const exphbs = require('express-handlebars')
const bodyParser = require("body-parser");
//importing and connecting to the db 
const connectDB = require('./config/db')

// load the config 
dotenv.config({path:'./config/config.env'})

const app = express()
connectDB()
//body parser 
app.use(express.json())
// initiliase body parse 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// set morgan 
if (process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}
app.engine('.hbs',exphbs({extname:'.hbs'}))
app.set('view engine', '.hbs')


//import routes 
const User = require('./routes/User')
const Post = require('./routes/Post')


app.use('/auth/v1/',User)
app.use('/api/v1/',Post)
//set test 
app.get('/', (req,res) => res.send("Hello"))

const PORT = process.env.PORT

app.listen(PORT,console.log(`Tujuane running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline))
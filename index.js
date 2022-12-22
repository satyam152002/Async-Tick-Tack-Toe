//import dependencies
require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const session=require('express-session')
const cors=require('cors')
//Import Routes
const authRouter=require('./routes/auth')
const gameRouter=require('./routes/game')
//set configuration
mongoose.set('strictQuery',false)
mongoose.connect(process.env.DATABASE_URL,()=>console.log("connected"))

//setup middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({secret:"123s",resave:false,saveUninitialized:false,name:"app.session"}))
app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:["GET","POST"],
    credentials:true
}))
//setupRoutes
app.use('/auth',authRouter)
app.use('/game',gameRouter)





//listen
app.listen(process.env.PORT||1000,(err)=>{
    console.log(`server started at port 1000`)
})

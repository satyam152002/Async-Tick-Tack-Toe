const express=require('express')
const User = require('./../model/User')
const router=express.Router()

router.post('/login',async (req,res)=>{
    const {username,password}=req.body;
    console.log(req.body)
    if(username==null||password==null)
        return res.status(400).send("Invalid Request")
    try
    {
        let user=await User.findOne({username:username})
        if(user==null)
            return res.status(400).send("Username Does Not Exist")
        if(user.password!==password)
            return res.status(400).send("Invalid Password")
        req.session.user={name:user.name,email:user.email,id:user._id}
        console.log("login")
        return res.status(200).send("Login Successfully")
    }
    catch(e)
    {
        return res.status(500).send(e.message)
    }
})
router.post('/register',async (req,res)=>{
    const{name,username,email,password}=req.body;
    console.log(req.body)
    if(name==null||username==null||email==null||password==null)
        return res.status(400).send("Invalid Request")

    let user=await User.findOne({username:username})
    if(user!==null) 
        return res.status(400).send("Username Already Taken");
    user=await User.findOne({email:email})
    if(user!==null)
        return res.status(400).send("Email Already Taken");
    try
    {
        let newUser=new User({name:name,username:username,email:email,password:password})
        newUser=await newUser.save()
        return res.status(201).send("Account Created Successfully")
    }
    catch(e)
    {
        console.log(e)
        return res.status(500).send(e.message)
    }
})
router.get('/users',async(req,res)=>{
    try
    {
        let users=await User.find({},{username:1,email:1,_id:1});
        return res.status(200).json(users)
    }
    catch(e)
    {
        return res.status(500).send(e.message)
    }
})
module.exports=router;
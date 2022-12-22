const express=require('express')
const GameState = require('../model/GameConstant')
const User = require('../model/User')

const router=express.Router()
const Game=require('./../model/Game')



router.get('/',async (req,res)=>{
    try
    {
        let games=await Game.find({}).sort("-updatedAt").populate("currentTurn","_id name").
            populate("startUser","_id name username")
            .populate('opponentUser',"_id name username")
        return res.status(200).json(games)
    }
    catch(e)
    {
        return res.status(500).send("")
    }
})
router.get('/:id',async (req,res)=>{
    const id=req.params.id
    try
    {
        let game=await Game.findOne({_id:id}).
            populate("currentTurn","_id name").
            populate("startUser","_id name username")
            .populate('opponentUser',"_id name username")
        return res.status(200).json(game)
    }
    catch(e)
    {
        return res.sendStatus(500)
    }
})

router.post('/',async (req,res)=>{
    const{email }   =req.body

    if(email==null)
        return res.status(400).send("Invalid Request")
    try
    {
        let user=await User.findOne({email:email})
        if(user==null) return res.status(400).send("Email Does Not Exists")
        let game=new Game({
            email:user.email,
            startUser:req.session.user.id,
            turn:req.session.user.id,
            state:GameState.PLAYING,
        })
        game=await game.save()
        return res.status(201).json(game)
    }
    catch(e)
    {
        return res.status(500).send("Internal Server Error")
    }
})


module.exports=router
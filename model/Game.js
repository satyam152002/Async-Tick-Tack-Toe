const mongoose=require('mongoose')
const GameState = require('./GameConstant')
const gameSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    startUser:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    opponentUser:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    currentTurn:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    board:{
        type:mongoose.Types.Array(9),
        default:Array(9).fill(0),
        required:true
    },
    state:{
        type:String,
        required:true,
        validate:{
            validator:function(val)
            {
                let keys=Object.keys(GameState)
                for(let key of keys)
                {
                    if(key===val)
                        return true
                }
                return false
            },
            message:(props)=>`Invalid Game State ${props.value}`
        }
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    winnerName:{
        type:String
    }
})

gameSchema.pre('save',(next)=>{
    this.updatedAt=Date.now()
    console.log("updated")
    next()
})

module.exports=mongoose.model('Game',gameSchema)
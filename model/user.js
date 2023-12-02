const mongoose=require('mongoose')

const Userschema=new mongoose.Schema({

    Name:{
        type:String,
        required:true
    },

    Email:{
        type:String,
        required:true
    },
    
    Password:{
        type:String,
        required:true
    }


})

const User=mongoose.model("User",Userschema)

module.exports=User
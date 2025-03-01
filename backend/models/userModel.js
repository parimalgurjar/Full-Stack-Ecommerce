const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true 
    },
    email:{
        type:String,
        unique:true,
        required: true 
    },
    profilePic:String,
    password:{
        type:String,
        required: true 
    },
    role:String
},{
        timestamps:true,
    
})

const userModel=mongoose.model('User',userSchema)
module.exports=userModel
const mongoose=require('mongoose')

async function connectDb(){
    try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected to db")
    }
    catch(err){
        console.log("not connected to db",err)
    }

}
module.exports=connectDb;
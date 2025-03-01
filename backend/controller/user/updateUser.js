const userModel = require("../../models/userModel")

async function updateUser(req,res){
    try{
        let {userId,name,email,role}=req.body
        const sessionUser=req.userId
        const payload={
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role }) 
        }
        const user=await userModel.findById(sessionUser)
      
        const updateUser=await userModel.findByIdAndUpdate(userId,payload)
        res.json({
            data:updateUser,
            message:"User updated",
            success:true,
            error:false
        })

    }
    catch(err){
        res.status(404).json({
            message:err.message,
            success:false,
            error:true
            

        })
    }
}
module.exports=updateUser
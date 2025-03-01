const userModel = require("../../models/userModel")

async function userDetailsController(req,res){
    try{
        
    
        const user = await userModel.findById(req.userId);

        res.status(200).json({
            data:user,
            success:true,
            error:false,
            message:"User detail"

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
module.exports=userDetailsController
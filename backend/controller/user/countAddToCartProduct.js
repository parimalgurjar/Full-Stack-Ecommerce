const addToCartModel = require("../../models/cartProduct")

const countToCartProduct=async(req,res)=>{
    try{
        const userId=req.userId
        const count=await addToCartModel.countDocuments({
            userId:userId
        })
        res.json({
            data:{
                count:count
            },
            message:"Ok",
            error:false,
            success:true
        })
       

    }
    catch(error){
        res.json({
            message:error.message||error,
            success:false,
            error:true
        })

    }
}
module.exports=countToCartProduct
const productModel = require("../../models/productModel")

const getProductDetails=async(req,res)=>{
    try{
        const {productId}=req.body
        const product=await productModel.findById(productId)
        res.json({
            data:product,
            success:true,
            error:false,
            message:"ok"

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
module.exports=getProductDetails
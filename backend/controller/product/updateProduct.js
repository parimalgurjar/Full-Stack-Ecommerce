const uploadProductPermission = require("../../helpers/permission")
const productModel=require("../../models/productModel")
async function updateProductController(req,res) {
    try{
        if(!uploadProductPermission(req.userId)){
            throw new Error("permission denied")

        }
        const {_id,...resBody}=req.body
        const updateProduct=await productModel.findByIdAndUpdate(_id,resBody)

        res.json({
            message:"Product update successfully ",
            success:true,
            error:false,
            data:updateProduct
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
module.exports=updateProductController
const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function UploadProductController(req,res) {
    try{
        const sessionUserId=req.userId
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("permission denied")
        }
        const uploadProduct=new productModel(req.body)
        const saveProduct=await uploadProduct.save()
        res.status(201).json({
            message:"Product added successfully",
            error:false,
            success:true,
            data:saveProduct
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
module.exports=UploadProductController
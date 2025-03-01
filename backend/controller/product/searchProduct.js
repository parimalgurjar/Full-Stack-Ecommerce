const productModel = require("../../models/productModel")

const searchProduct=async(req,res)=>{
    try{
        const query=req.query.query ||""
        const regex = new RegExp(query, "ig"); 

        const product=await productModel.find({
            "$or":[
                {
                    productName:regex

                },
                {
                    category:regex
                }
            ]
        })
        res.json({
            data:product,
            message:"search product list",
            error:false,
            success:true
        })
    }
    catch(err){
        res.json({
            message:err.message||err,
            error:true,
            success:false
        })
    }
}
module.exports=searchProduct
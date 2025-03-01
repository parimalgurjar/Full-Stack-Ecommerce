const productModel = require("../../models/productModel")

const getCategoryProduct=async(req,res)=>{
    try{
        const productCategory=await productModel.distinct("category")
        


        const productByCategory=[]
        for(const category of productCategory){
            const product=await productModel.find({category})
            if(product){
                productByCategory.push(product)
            }
        
        }
        res.json({
            message:"Product category",
            data:productByCategory,
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
module.exports=getCategoryProduct
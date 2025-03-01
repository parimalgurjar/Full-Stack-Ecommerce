const mongoose=require('mongoose')
const addToCard=new mongoose.Schema({
    productId:{
        ref:"product",
        type:String
    },
    quantity:Number,
    userId:String
},{
    timestamps: true
})
const addToCartModel=mongoose.model("addToCart",addToCard)
module.exports=addToCartModel
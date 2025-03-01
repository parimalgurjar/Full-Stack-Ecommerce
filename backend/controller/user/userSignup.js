const userModel = require("../../models/userModel");
const bcrypt = require('bcrypt');
async function userSignUpController(req,res) {
    try{
        const {name,email,password}=req.body;
        const user=await userModel.findOne({email})
        if(user){
            console.log("user already exist")
        }
        if(!name){
            throw new Error("Name is not provided")
        }
        if(!email){
            throw new Error("Email is not provided")
        }
        if(!password){
            throw new Error("Password is not provided")
         
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        if(!hashPassword){
            throw new Error("something is wrong with password")
        }
        const payload={
            ...req.body,
            role:"GENERAL",
            password:hashPassword
        }
    
        const userData=new userModel(payload)
        const saveUser=await userData.save()
        res.status(201).json({
            data:saveUser,
            success:true,
            error:false,
            message:"User created sucessfully"
        })

    }
    catch(err){
        res.status(500).json({
            message:"User already exist",
            error:true,
            success:false,
        })
    }
    
}
module.exports=userSignUpController
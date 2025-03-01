const bcrypt = require('bcryptjs');
const userModel = require("../../models/userModel");
var jwt = require('jsonwebtoken');

async function userSignInController(req, res) { // Function definition is needed
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

       
        const checkPassword = await bcrypt.compare(password.toString(), user.password);

        if (!checkPassword) {
            throw new Error("Incorrect password");
        }

       


        const tokenData={
            _id: user.id.toString(),
            email:user.email
        }
        const tokenOption={
            httpOnly:true,
            secure:true
        }

        const token = jwt.sign(
            tokenData
          , process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60*24 });
          
        res.cookie("token",token,tokenOption).json({
            message: "Login successful",
            success: true,
            data:token,
            error:false
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;

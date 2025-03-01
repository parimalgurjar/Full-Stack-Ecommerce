async function userLogout(req, res) {
    try {
        const tokenOption={
            httpOnly:true,
            secure:true,
            sameSite:'None'
        }
    
        res.clearCookie("token", tokenOption);


        
        res.status(200).json({
            error: false,
            success: true,
            message: "Logout successfully",
            data: []
        });
    } catch (error) {
        
        res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
}
module.exports=userLogout
async function userLogout(req, res) {
    try {
    
        res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        
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
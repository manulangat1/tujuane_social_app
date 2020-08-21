


exports.isActive = async (req,res,next) => {
    try{
        if (req.user && req.user.isActive){
            next()
        }
    } catch (err){
        console.log(`Error:${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
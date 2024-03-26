const  adminmiddleware = async (req, res, next) => {
    try{
        const admin = req.user.isAdmin;
        if(!admin){
            res.status(200).json({message:"You are not admin"})
        }
        next();
    }
    catch(err){
        next(err);
    }
}
module.exports = adminmiddleware;
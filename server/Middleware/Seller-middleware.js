const  sellermiddleware = async (req, res, next) => {
    try{
        const seller = req.user.role;
        if(seller !== 'seller'){
            res.status(200).json({message:"You are not seller, you are not authorized to access this route"})
        }
        next();
    }
    catch(err){
        next(err);
    }
}
module.exports = sellermiddleware;
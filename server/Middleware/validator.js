const validate = (schema) => async (req, res, next) =>{
    try{
        const value = await schema.parseAsync(req.body);
        req.body = value;
        next();
    }
    catch(err){
        const error = err.errors[0].message;
        next(error)
    }
}
module.exports = validate;
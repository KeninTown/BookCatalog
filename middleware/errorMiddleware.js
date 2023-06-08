import ApiError from "../exeptions/ApiError.js";

export default function(err, req, res, next){
    console.log(err);
    if(err instanceof ApiError)
        return res.status(err.status).json({message:err.message, errors: err.errors})
    
    return res.status(500).send('Unexprected error');
}
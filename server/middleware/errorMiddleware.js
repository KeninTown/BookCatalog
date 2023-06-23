import ApiError from "../exeptions/ApiError.js";

export default function(err, req, res, next){
    console.log(err);
    if(err instanceof ApiError)
        return res.status(err.status).json({message:err.message, errors: err.errors})
    
    if(err.kind === 'ObjectId' && err.name === 'CastError')
        return res.status(404).json({message: 'Invalid id', errors: err.errors});

    if(err.name === 'JsonWebTokenError')
        return res.status(401).json({message: 'Unauthorized', errors: err.errors});

    return res.status(500).json({message: 'Unexprected error', errors: err.errors});
}
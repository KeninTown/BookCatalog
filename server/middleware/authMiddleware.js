import ApiError from "../exeptions/ApiError.js";
import TokenService from "../services/TokenService.js";

export default function(req, res, next){
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader)
            return next(ApiError.Unauthorized());

        const accessToken = authHeader.split(' ')[1];
        const userData = TokenService.validateAccessToken(accessToken);
        if(!userData)
            return next(ApiError.Unauthorized());
        
        req.user = userData;
        next();
    } catch (error) {
       next(error); 
    }
}
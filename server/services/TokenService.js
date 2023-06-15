import TokenModel from "../models/TokenModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

class TokenService{
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCES_SECRET, {expiresIn:'3h'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'30m'});

        return {accessToken, refreshToken};
    }

    async saveRefreshToken(id, refreshToken){
        try {
            await TokenModel.create({user: id, refreshToken});
        } catch (error) {
            console.log(error);
        }
    }

    async removeToken(refreshToken){
        const data = await TokenModel.deleteOne({refreshToken});
        return data;
    }

    validateRefreshToken(refreshToken){
        const data = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        return data;
    }

    validateAccessToken(accessToken){
        const data = jwt.verify(accessToken, process.env.JWT_ACCES_SECRET);
        return data;
    }

    async refresh(refreshToken){
        
    }
}

export default new TokenService();
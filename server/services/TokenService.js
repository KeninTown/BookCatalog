import TokenModel from "../models/TokenModel.js";
import jwt from 'jsonwebtoken';
import randToken from 'rand-token'
import ResetTokenModel from '../models/ResetTokenModel.js';
import ApiError from "../exeptions/ApiError.js";
import dotenv from 'dotenv'
dotenv.config()

class TokenService{

    //создание пары токенов
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCES_SECRET, {expiresIn:'30d'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'});

        return {accessToken, refreshToken};
    }

    //сохранение refreshTokenа в mongoDB
    async saveRefreshToken(id, refreshToken){
        await TokenModel.create({user: id, refreshToken});
    }

    //удаление refreshTokenа из mongoDB
    async removeToken(refreshToken){
        const data = await TokenModel.deleteOne({refreshToken});
        return data;
    }

    //проверка refreshTokenа
    validateRefreshToken(refreshToken){
        const data = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        return data;
    }

    //проверка accessTokenа
    validateAccessToken(accessToken){
        const data = jwt.verify(accessToken, process.env.JWT_ACCES_SECRET);
        return data;
    }

    async generateResetToken(userId){
        const resetToken = randToken.generate(6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        await ResetTokenModel.create({userId, value:resetToken});
        return resetToken;
    }

    async validateResetToken(resetToken){
  
        const token = await ResetTokenModel.findOne({value:resetToken});
        console.log(token);
        if(!token)
            throw ApiError.BadRequest('Invalid reset token');

        const currentTime = Date.now();
        
        //срок жизни токена 24 часа, проверяем действителен ли токен
        if(currentTime - token.creationTime > 86400000)
            throw ApiError.BadRequest('Reset token expired')

        return token;
    }
    
    async removeResetToken(resetToken){
        await ResetTokenModel.deleteOne({value:resetToken});
    }
}

export default new TokenService();
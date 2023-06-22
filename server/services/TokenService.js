import TokenModel from "../models/TokenModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

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
}

export default new TokenService();
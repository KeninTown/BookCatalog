import ApiError from "../exeptions/ApiError.js";
import AuthService from "../services/AuthService.js";
import {validationResult} from 'express-validator'

class AuthController{
    async registration(req, res, next){
        try {
            const validResult = validationResult(req);
            if(!validResult.isEmpty())
                throw ApiError.BadRequest('Validation error', validResult.array())
            
            const {email, username, password} = req.body;
            const userData = await AuthService.registration(email, username, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge:900000, httpOnly:true});
            res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next){
        try {
            const {email, password} = req.body;
            const userData = await AuthService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge:900000, httpOnly:true});
            res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const data = await AuthService.logout(refreshToken);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const userData = await AuthService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 9000000,httpOnly: true});
            res.json(userData); 
        } catch (error) {
            next(error);
        }
    }

    async activate(req, res, next){
        try {
            const activationLink = req.params.link;
            await AuthService.activate(activationLink);
            res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            next(error);
        }
    }

    async sendResetEmail(req, res, next){
        try {
            const validResult = validationResult(req);
            if(!validResult.isEmpty())
                throw ApiError.BadRequest('Validation error', validResult.array())

            const {email} = req.body;
            await AuthService.sendResetEmail(email);
            res.sendStatus(201);
        } catch (error) {
            next(error)  
        }
    }
    
    async resetPassword(req, res, next){
        try {
            const validResult = validationResult(req);
            if(!validResult.isEmpty())
                throw ApiError.BadRequest('Validation error', validResult.array())

            const {token, password} = req.body;

            if(!token)
                throw ApiError.BadRequest('Required reset token')

            await AuthService.resetPassword(token, password);
            
            res.sendStatus(201);
        } catch (error) {
            next(error)  
        }
    }
}

export default new AuthController();
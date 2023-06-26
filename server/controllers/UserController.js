import ApiError from "../exeptions/ApiError.js";
import AuthService from "../services/AuthService.js";
import UserService from "../services/UserService.js";
import {validationResult} from 'express-validator'

class UserController{
    async getUser(req, res, next){
        try {
            const id = req.params.id;
            const userData = await UserService.getUser(id);
            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    }

    async getUsers(req, res, next){
        try {
            const usersData = await UserService.getUsers();
            res.status(200).json(usersData);
        } catch (error) {
            next(error);
        }
    }

    async getLogo(req, res, next){
        try {
            const id = req.params.id;

            const logoStream = await UserService.getLogo(id);
            res.setHeader('Content-disposition', 'attachment; filename=' + 'logo.jpg');
            res.setHeader('Content-type', 'application/octet-stream');
            logoStream.pipe(res);
        } catch (error) {
            next(error);
        }
    }

    async uploadLogo(req, res, next){
        try {
            const id = req.params.id;
            const file = req.file;
            await UserService.uploadLogo(id, file);
            
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }

    async deleteLogo(req, res, next){
        try {
            const id = req.params.id;

            await UserService.deleteLogo(id);
            
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }

    async changeEmail(req, res, next){
        try {
            const validResult = validationResult(req);
            if(!validResult.isEmpty())
                throw ApiError.BadRequest('Validation error', validResult.array())

            const NewEmail = req.body.email;
            const {id, email} = req.user;
            console.log(id);
            if(NewEmail === email)
                return next(ApiError.BadRequest('It is already youre email'))

            const {refreshToken} = req.cookies

            await UserService.changeEmail(NewEmail, id);

            const userInfo = await AuthService.refresh(refreshToken);

            res.status(200).json(userInfo)
        } catch (error) {
            next(error)
        }
    }

    async changeUsename(req, res, next){
        try {
            const {username, id} = req.user;
            console.log('req.user', req.user);
            const newUsername = req.body.username;
            if(newUsername === username)
                return next(ApiError.BadRequest('It is already your loggin'));

            await UserService.changeUsername(newUsername, id);

            res.sendStatus(200);
        } catch (error) {
            next(error)
        }
    }

    async checkPassword(req, res, next){
        try {
            const {id} = req.user;
            const {password} = req.body;
            await UserService.checkPassword(password, id);
            res.sendStatus(200);
        } catch (error) {
            next(error)
        }
    }

    async changePassword(req, res, next){
        try {
            const validResult = validationResult(req);
            if(!validResult.isEmpty())
                throw ApiError.BadRequest('Validation error', validResult.array())
            
            const id = req.params.id;
            
            const {password} = req.body;
            await UserService.changePassword(password, id);

            res.sendStatus(200);
        } catch (error) {
            next(error)
        }
    }

    async chooseFavoriteBook(req, res, next){
        try {
            const userId = req.params.id;
            const {bookId} = req.body;
            await UserService.chooseFavoriteBook(bookId, userId);
            res.sendStatus(201);
        } catch (error) {
            next(error)
        }
    }

    async getFavoriteBook(req, res, next){
        try {
            const userId = req.params.id;
            const {limit, page} = req.body;
            const favoriteBooks = await UserService.getFavoriteBook(limit, page, userId);
            res.status(200).json(favoriteBooks);
        } catch (error) {
            next(error)
        }
    }

    async deleteFavoriteBook(req, res, next){
        try {
            const userId = req.params.id;
            const {bookId} = req.body;
            await UserService.deleteFavoriteBook(bookId, userId);
            res.sendStatus(204);
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController();
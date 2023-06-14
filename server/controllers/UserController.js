import ApiError from "../exeptions/ApiError.js";
import UserService from "../services/UserService.js";

class UserController{
    async changeEmail(req, res, next){
        try {
            const {email} = req.body;

            res.status(200).end()
        } catch (error) {
            next(error)
        }
    }

    async changeUsename(req, res, next){
        try {
            const {username, id} = req.user;
            const newUsername = req.body.username;

            if(newUsername === username)
                return next(ApiError.BadRequest('It is already your loggin'));

            const userInfo = await UserService.changeUsername(newUsername, id);
            res.cookie('refreshToken', userInfo.refreshToken, {maxAge:900000, httpOnly:true})

            res.status(200).json(userInfo);
        } catch (error) {
            next(error)
        }
    }

    async changePassword(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async chooseFavoriteBook(req, res, next){
        try {
            const userId = req.params.id;
            const {bookId} = req.query;
            await UserService.chooseFavoriteBook(bookId, userId);
            res.status(201).end();
        } catch (error) {
            next(error)
        }
    }

    async getFavoriteBook(req, res, next){
        try {
            const userId = req.params.id;
            const favoriteBooks = await UserService.getFavoriteBook(userId);
            res.status(200).json(favoriteBooks);
        } catch (error) {
            next(error)
        }
    }

    async deleteFavoriteBook(req, res, next){
        try {
            const {userId, bookId} = req.body;
            await UserService.deleteFavoriteBook(bookId, userId);
            res.status(204).end();
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController();
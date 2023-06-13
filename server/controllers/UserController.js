import UserService from "../services/UserService.js";

class UserController{
    async changeEmail(req, res, next){
        try {
            const {email} = req.body;

            res.status(201).end()
        } catch (error) {
            next(error)
        }
    }

    async changeUsename(req, res, next){
        try {
            
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
}
import AuthService from "../services/AuthService.js";

class AuthController{
    async registration(req, res, next){
        try {
            const {email, username, password} = req.body;
            const userInfo = await AuthService.registration(email, username, password);
            res.cookie('refreshToken', userInfo.refreshToken, {maxAge:900000, httpOnly:true});
            res.json(userInfo);
        } catch (error) {
            console.log(error);
        }
    }

    async login(req, res, next){
        try {
            const {email, password} = req.body;
            const userData = await AuthService.login(email, password);
            res.json(userData);
        } catch (error) {
            console.log(error);
        }
    }

    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const data = await AuthService.logout(refreshToken);
            res.json(data);
        } catch (error) {
            console.log(error);
        }
    }

    async refresh(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const userData = await AuthService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 9000000,httpOnly: true});
            res.json(userData); 
        } catch (error) {
            console.log(error);
        }
    }

    async activate(req, res, next){
        try {
            const activationLink = req.params.link;
            await AuthService.activate(activationLink);
            res.redirect('https://ya.ru/');
        } catch (error) {
            console.log(error);
        }
    }
}

export default new AuthController();
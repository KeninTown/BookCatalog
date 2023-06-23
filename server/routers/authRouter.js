import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import {body} from 'express-validator';
import UserController from "../controllers/UserController.js";

const authRouter = new Router();

//авторизация юзера
authRouter.post('/registration', body('email').isEmail(),
body('password').isLength({min:6, max: 32}), AuthController.registration);
authRouter.post('/login', AuthController.login);
authRouter.post('/logout', AuthController.logout);
authRouter.get('/refresh', AuthController.refresh);
authRouter.get('/activate/:link', AuthController.activate);

//Отправка сообщения с токеном для сброса пароля и проверка токена
authRouter.post('/resetPassword', body('email').isEmail(), AuthController.sendResetEmail)
authRouter.post('/resetPassword/:token', body('email').isEmail(), AuthController.compareResetToken)

//Изменение пароля
authRouter.put('/resetPassword', body('password').isLength({min:6, max: 32}), UserController.changePassword);

//авторизация в Dropbox
authRouter.get('/dropboxRefreshToken', AuthController.refreshDropboxToken);

export default authRouter;

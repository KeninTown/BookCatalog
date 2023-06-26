import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import {body} from 'express-validator';

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
authRouter.put('/resetPassword', body('password').isLength({min:6, max: 32}), 
AuthController.resetPassword)

export default authRouter;

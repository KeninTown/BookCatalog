import { Router } from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from '../middleware/authMiddleware.js';
import {body} from 'express-validator';
import multer from "multer";
import CommentController from "../controllers/CommentController.js";

const upload = multer();

const router = new Router();

//получение всех пользователей
router.get('/', authMiddleware(['Admin']), UserController.getUsers);

//проверка на авторизацию
router.use('/:id', authMiddleware(['User', 'Admin']));

//информация о пользователе
router.get('/:id', UserController.getUser)

//логотип пользователя
router.get('/:id/logo', UserController.getLogo);
router.put('/:id/logo', upload.single('logo'), UserController.uploadLogo);
router.delete('/:id/logo', UserController.deleteLogo);

//комментарии пользователя
router.get('/:id/comments', CommentController.getByUserId);

//изменение пользовательских данных
router.put('/:id/email', body('email').isEmail(), UserController.changeEmail);
router.put('/:id/username', UserController.changeUsename);
router.post('/:id/checkpassword', UserController.checkPassword);
router.put('/:id/password', body('password').isLength({min:6, max: 32}), UserController.changePassword);

//избранные книги пользователя
router.post('/:id/favoritebooks', UserController.chooseFavoriteBook);
router.get('/:id/favoritebooks', UserController.getFavoriteBook);
router.delete('/:id/favoritebooks', UserController.deleteFavoriteBook);

export default router;
import { Router } from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from '../middleware/authMiddleware.js';
import {body} from 'express-validator';
import multer from "multer";
import CommentController from "../controllers/CommentController.js";

const upload = multer();

const router = new Router();

router.get('/:id', UserController.getUser)

router.use('/:id', authMiddleware);

router.get('/:id/logo', UserController.getLogo);
router.put('/:id/logo', upload.single('logo'), UserController.uploadLogo);

router.get('/:id/comments', CommentController.getByUserId);
router.put('/:id/email', body('email').isEmail(), UserController.changeEmail);
router.put('/:id/username', UserController.changeUsename);
router.post('/:id/checkpassword', UserController.checkPassword);
router.put('/:id/password', body('password').isLength({min:6, max: 32}), UserController.changePassword);
router.post('/:id/favoritebooks', UserController.chooseFavoriteBook);
router.get('/:id/favoritebooks', UserController.getFavoriteBook);
router.delete('/:id/favoritebooks', UserController.deleteFavoriteBook);

export default router;
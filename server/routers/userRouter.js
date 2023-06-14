import { Router } from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

router.use('/', authMiddleware);

router.put('/:id/email', UserController.changeEmail);
router.put('/:id/username', UserController.changeUsename);
router.put('/:id/password', UserController.changePassword);
router.post('/:id/favoritebooks', UserController.chooseFavoriteBook);
router.get('/:id/favoritebooks', UserController.getFavoriteBook);
router.delete('/:id/favoritebooks', UserController.deleteFavoriteBook);

export default router;
import {Router} from 'express';
import authRouter from './authRouter.js'
import bookRouter from './bookRouter.js'
import userRouter from './userRouter.js'

const router = new Router();

router.use('/books', bookRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
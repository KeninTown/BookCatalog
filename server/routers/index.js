import {Router} from 'express';
import authRouter from './authRouter.js'
import bookRouter from './bookRouter.js'

const router = new Router();

router.use('/books', bookRouter);
router.use('/auth', authRouter);

export default router;
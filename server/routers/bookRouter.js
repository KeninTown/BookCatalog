import { Router } from "express";
import BookController from "../controllers/BookController.js";
import CommentController from "../controllers/CommentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const bookRouter = new Router();

bookRouter.get('/', BookController.getBooks)
bookRouter.get('/:id', BookController.getOneBook)

bookRouter.get('/:id/comments', CommentController.getByBookId);
bookRouter.post('/:id/comments', authMiddleware, CommentController.create);
bookRouter.put('/:id/comments', authMiddleware, CommentController.update);


export default bookRouter;
import { Router } from "express";
import BookController from "../controllers/BookController.js";
import CommentController from "../controllers/CommentController.js";

const bookRouter = new Router();

bookRouter.get('/', BookController.getBooks)
bookRouter.get('/:id', BookController.getOneBook)
bookRouter.post('/:id/comments', CommentController.create);

export default bookRouter;
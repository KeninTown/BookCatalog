import { Router } from "express";
import BookController from "../controllers/BookController.js";

const bookRouter = new Router();

bookRouter.get('/books', BookController.getBooks)
bookRouter.get('/books/:id', BookController.getOneBook)

export default bookRouter;
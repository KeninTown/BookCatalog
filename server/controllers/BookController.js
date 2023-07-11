import BookService from "../services/BookService.js"

class BookController{
    async getBooks(req, res, next){
        try {
            const {limit, page, genre, author, text} = req.query;
            const books = await BookService.getBooks(limit, page, genre, author, null, text);
            res.json(books);
        } catch (error) {
            next(error);
        }
    }

    async createBook(req, res, next){
        try {
            const bookInfo = req.body;
            await BookService.createBook(bookInfo);
            res.sendStatus(201);
        } catch (error) {
            next(error);
        }
    }

    async getOneBook(req, res, next){
        try {
            const bookId = req.params.id;
            const book = await BookService.getOne(bookId);
            res.json(book);
        } catch (error) {
            next(error);
        }
    }
}

export default new BookController()
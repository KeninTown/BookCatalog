import BookService from "../services/bookService.js"

class BookController{
    async getBooks(req, res, next){
        try {
            const {limit, page} = req.query;
            const books = await BookService.getBooks(limit, page);
            res.json(books);
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

    async createComment(req, res, next){
        try {
            const bookId = req.params.id;
            const {title, text, username} = req.body;
            await BookService.createComment(bookId, username, title, text);
            res.status(200).end();
        } catch (error) {
            next(error)
        }
    }
}

export default new BookController()
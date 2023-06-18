import BookService from "../services/BookService.js"

class BookController{
    async getBooks(req, res, next){
        try {
            const {limit, page, genre, author} = req.query;
            const books = await BookService.getBooks(limit, page, genre, author);
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
}

export default new BookController()
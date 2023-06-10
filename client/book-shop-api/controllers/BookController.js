import bookService from "../services/bookService.js"

class BookController{
    async getBooks(req, res){
        const books = await bookService.getBooks(req.query.amount);
        res.json(books);
    }

    async getOneBook(req, res){
        const book = await bookService.getOne(req.params.id);
        res.json(book);
    }
}

export default new BookController()
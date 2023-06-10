import { Router } from "express";
import BookController from "../controllers/BookController.js";

const bookRouter = new Router();

bookRouter.get('/books', BookController.getBooks)
bookRouter.get('/books/:id', BookController.getOneBook)
bookRouter.post('/books/:id/comments', BookController.createComment);

import fetch from "node-fetch"; //delete
import BookDto from "../dtos/BookDto.js"; //delete
import BookModel from "../models/BookModel.js"

bookRouter.get('/db', async (req, res) => { //delete
    try {
        let authors = [
            // 'Оскар Уайлд',
            // 'Фицджеральд',
            // 'Селенджер',
            // 'Сафран Фоер',
            // 'Бакман',
            // 'Сильвера',
            // 'Кизи',
            // 'Булгаков',
            // 'Бардуго',
            // 'Достоевский',
            // 'Пушкин',
            // 'Чехов',
            // 'Гоголь',
            // 'Буковски',
            // 'Несбё',
            // 'Ремарк',
            // 'Рэнд',
            // 'Кинг',
            // 'Роулинг',
            // 'Бредбери',
            // 'Сапковский',
            // 'Толкин',
            // 'Оруэлл',
            // 'Дэн Браун',
            // 'Рик Риордан',
            // 'Лукьяненко',
            // 'Рут Уэйн',
            // 'Фрейд',
            'Лепера'
        ];
        
        const books = await BookModel.find();
        let booksId = []
        books.forEach(book => {
            booksId.push(book._id);
        })
        for(let i = 1; i <= 219; i++ )
        {
            await BookModel.findByIdAndUpdate(booksId[i-1], {bookIndex:i});
        }



        BooksId.items.forEach(book => {
            booksId.push(book.id);
        });  
        // console.log(booksId);
        booksId.forEach(async (id) => {
            try {
                const rawBook = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
                const book = await rawBook.json();
                // console.log(book);
                const bookDto = new BookDto(book);
                // count++;
                await BookModel.create({...bookDto})
            } catch (error) {
                console.log(error);
            }
        })
        res.send(`Готово`);
    } catch (error) {
        console.log(error);
    }
})

export default bookRouter;
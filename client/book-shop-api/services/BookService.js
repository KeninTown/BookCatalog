import fetch from "node-fetch";
import BookDto from "../dtos/bookDto.js";

class BookService{
    async getBooks(amount){
        try {    
            const rawData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=*&printType=books&maxResults=${amount}`);
            const rawBooks = await rawData.json();
            let books = [];
            rawBooks.items.forEach(book => {
                const bookDto = new BookDto(book);
                books.push({...bookDto});
            });  
            return books;
        } catch (error) {
            console.log(error);
        }
    }

    async getOne(id){
        try {
            const rawData = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
            const bookInfo = await rawData.json();
            
            const bookDto = new BookDto(bookInfo);
            return bookDto;    
        } catch (error) {
            console.log(error);
        }
    }
}

export default new BookService();
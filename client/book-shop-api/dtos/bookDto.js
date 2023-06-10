class BookDto{
    id;
    authors;
    title;
    img;
    genre;
    
    constructor(book){
        this.id = book.id;
        this.authors = book.volumeInfo.authors;
        this.title = book.volumeInfo.title;
        this.img = book.volumeInfo.imageLinks;
        this.genre = book.volumeInfo.categories;
    }
}

export default BookDto;
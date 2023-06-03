class BookDto{
    title;
    authors;
    genre;
    description;
    publisher;
    publishedDate;
    pageCount;
    maturityRating;
    img;
    
    constructor(book){
        this.title = book.volumeInfo.title;
        this.authors = book.volumeInfo.authors;
        this.genre = book.volumeInfo.categories;
        this.description = book.volumeInfo.description;
        this.publisher = book.volumeInfo.publisher;
        this.publishedDate = book.volumeInfo.publishedDate;
        this.pageCount = book.volumeInfo.pageCount;
        this.maturityRating = book.volumeInfo.maturityRating;
        this.img = book.volumeInfo.imageLinks;
    }
}

export default BookDto;
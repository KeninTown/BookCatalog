import ApiError from "../exeptions/ApiError.js";
import BookModel from "../models/BookModel.js";

class BookService{
    constructor(){
        this.selectParams = '_id authors img description publisher pageCount title';
    }

    async getBooks(limit, page, genres, author, booksId, text){ 
        const limitNumber = parseInt(limit, 10) || 10;
        const pageNumber = parseInt(page, 10) || 1;
        let query = {};
        if(text){
            const regexText = new RegExp(text, "gi")
            query = {$or:[
                {title: {$regex : regexText}},
                {authors: {$regex : regexText}},
                {genres: {$regex : regexText}},
                {publisher: {$regex : regexText}}
            ]}
        }
        else{
            if(booksId)
            {
                let correctedBooksId = [];
                booksId.forEach(book => {
                    correctedBooksId.push({_id:book.bookId});
                })
                query = {$or:correctedBooksId}
            }
            else{
                const genresArr = genres?.split('-');
                const authorsArr = author?.split('-');
                
                const genreQuery = genresArr ? {genres:{$in: genresArr}} : {};
                const authorQuery = authorsArr ? {authors:{$in: authorsArr}} : {};
        
                query = {$and: [genreQuery, authorQuery]};
            }
        }
        
        const books = await BookModel.paginate(query, {
            page:pageNumber, 
            limit:limitNumber, 
            select: this.selectParams,
            customLabels:{docs:'books'}});
    
        return books;
    }

    async createBook(bookInfo){ 
        await BookModel.create({...bookInfo})
    }

    async getOne(bookId){
        const book = await BookModel.findById(bookId).select('-__v');
        if(!book)
            throw ApiError.BadRequest('No book with such id');
        
        return {...book._doc};  
    }

    async getFavoriteBook(bookId){
        const book = await BookModel.findById(bookId).select(this.selectParams);
        if(!book)
            throw ApiError.BadRequest('No book with such id');
        
        return {...book._doc};
    }
}

export default new BookService();
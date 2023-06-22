import ApiError from "../exeptions/ApiError.js";
import BookModel from "../models/BookModel.js";

class BookService{
    constructor(){
        this.selectParams = '_id authors img description publisher pageCount title';
    }

    async getBooks(limit, page, genres, author){ 
        const limitNumber = parseInt(limit, 10) || 10;
        const pageNumber = parseInt(page, 10) || 1;

        const genresArr = genres?.split('-');
        const authorsArr = author?.split('-');
        
        const genreQuery = genresArr ? {genres:{$in: genresArr}} : {};
        const authorQuery = authorsArr ? {authors:{$in: authorsArr}} : {};

        const query = {$and: [genreQuery, authorQuery]};
        
        const books = await BookModel.paginate(query, {
            page:pageNumber, 
            limit:limitNumber, 
            select: this.selectParams,
            customLabels:{docs:'books'}});
    
        return books;
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
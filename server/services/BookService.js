import ApiError from "../exeptions/ApiError.js";
import BookModel from "../models/BookModel.js"
import UserModel from "../models/UserModel.js";
import CommentService from "./CommentService.js";

class BookService{
    constructor(){
        this.selectParams = '_id authors img description publisher pageCount title';
    }

    async getBooks(limit, page, genres){ 
        const limitNumber = parseInt(limit, 10) || 10;
        const pageNumber = parseInt(page, 10) || 1;
        const genresArr = genres?.split('-') || [];
        
        const books = await BookModel.paginate({
            genres: {$in: genresArr}
        }, {
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

        const comments = await CommentService.findBookComments(book._id);
        
        return {...book._doc, comments};  
    }

    async getFavoriteBook(bookId){
        const book = await BookModel.findById(bookId).select(this.selectParams);
        if(!book)
            throw ApiError.BadRequest('No book with such id');
        
        return {...book._doc};
    }

    async createComment(bookId, username, title, text){
        const book = await BookModel.findById(bookId);
        const user = await UserModel.findOne({username});
        
        if(!book || !user)
            throw ApiError.BadRequest('Invalid username or bookId');
        
        await CommentService.create(user._id, book._id, title, text);
    }
}

export default new BookService();
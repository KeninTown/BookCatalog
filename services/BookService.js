import ApiError from "../exeptions/ApiError.js";
import BookModel from "../models/BookModel.js"
import UserModel from "../models/UserModel.js";
import CommentService from "./CommentService.js";

class BookService{
    async getBooks(limit, page){ 
        const limitNumber = parseInt(limit, 10) || 10;
        const pageNumber = parseInt(page, 10) || 1;
        const books = await BookModel.paginate({}, {
            page:pageNumber, 
            limit:limitNumber, 
            select: '-__v',
            customLabels:{docs:'books'}});
        return books;
    }

    async getOne(id){
        const book = await BookModel.findById(id).select('-__v');
        if(!book)
            throw ApiError.BadRequest('No book with such id');
        
        const comments = await CommentService.findBookComments(book._id);
    
        return {...book, comments};  
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
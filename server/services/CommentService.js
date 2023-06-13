import ApiError from '../exeptions/ApiError.js';
import CommentModel from '../models/CommentModel.js';
import UserModel from '../models/UserModel.js';

class CommentService{
    async create(userId, bookId, title, text, rating){
        const user = await UserModel.findOne({username});
        if(!user)
            throw ApiError.BadRequest('No user');
        
        await CommentModel.create({userId, bookId, title, text, rating});
    }

    async findBookComments(bookId){
        const comments = await CommentModel.find({bookId})
        return comments;
    }
}

export default new CommentService();
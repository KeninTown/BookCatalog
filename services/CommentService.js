import CommentModel from '../models/CommentModel.js';

class CommentService{
    async create(userId, bookId, title, text){
        const comment = await CommentModel.create({userId, bookId, title, text});
        return comment;
    }

    async findBookComments(bookId){
        const comments = await CommentModel.find({bookId})
        return comments;
    }
}

export default new CommentService();
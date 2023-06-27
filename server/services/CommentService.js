import ApiError from '../exeptions/ApiError.js';
import CommentModel from '../models/CommentModel.js';
import UserModel from '../models/UserModel.js';

class CommentService{

    //создание комментария
    async create(userId, bookId, title, text, rating){
        const user = await UserModel.findById(userId);
        if(!user)
            throw ApiError.BadRequest('Invalid user id');
        
        if(!user.isActivated)
            throw ApiError.Forbidden('User account is not activated')

        await CommentModel.create({userId, bookId, title, text, rating});
    }

    //для нахождения всех комментариев к одной книге
    async getByBookId(bookId){
        const comments = await CommentModel.find({bookId}).select('-__v')
        return comments;
    }

    //для нахождения всех комментариев пользователя
    async getByUserId(userId){
        const comments = await CommentModel.find({userId}).select('-__v')
        return comments;
    }

    //Для изменения комментария: кол-ва лайков/дизлайков
    async update(id, likes, dislikes){
        const com = await CommentModel.findByIdAndUpdate(id, 
            {likes, dislikes}, {new: true});
    }
}

export default new CommentService();
import ApiError from "../exeptions/ApiError.js";
import FavoriteBookModel from "../models/FavoriteBookModel.js";
import BookService from "./BookService.js";
import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt';

class UserService{
    async getUser(id){ 
        const user = await UserModel.findById(id).select('-__v');

        if(!user)
            throw ApiError.BadRequest('No user with such id');
        
        return user;
    }

    async changeEmail(email, userId){
        const user = await UserModel.findById(userId);

        if(!user)
            throw ApiError.BadRequest('No user with such id');
        
        const existUser = await UserModel.findOne({email});
        if(existUser)
            throw ApiError.BadRequest('Email already taken');

        user.email = email;

        await user.save();
    }

    async changeUsername(username, userId){

        const user = await UserModel.findById(userId);

        if(!user)
            throw ApiError.BadRequest('No user with such id');
        
        const existUser = await UserModel.findOne({username});
        if(existUser)
            throw ApiError.BadRequest('Username already taken');

        user.username = username;

        await user.save();
    }

    async changePassword(password, id){
        const user = await UserModel.findById(id);
        if(!user)
            throw ApiError.BadRequest('No user with such id')

        const hashedPassword = await bcrypt.hash(password, 7);
        user.password = hashedPassword;
        await user.save();
    }

    async checkPassword(password, id){
        const user = await UserModel.findById(id);
        if(!user)
            throw ApiError.BadRequest('No user with such id')
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch)
            throw ApiError.BadRequest('Invalid password');
    }

    async chooseFavoriteBook(bookId, userId){
        const isFavorite = await FavoriteBookModel.findOne({bookId, userId});
        console.log(isFavorite);
        if(isFavorite)
            throw ApiError.BadRequest('Book already in favorites');
        await FavoriteBookModel.create({bookId, userId});
    }

    async getFavoriteBook(userId){
        const favoriteBooksId = await FavoriteBookModel.find({userId});
        if(!favoriteBooksId)
            throw ApiError.BadRequest('User has not any favorite book');

        console.log(favoriteBooksId);
        let favoriteBooksInfo = [];

        for(let i = 0; i < favoriteBooksId.length; i++)
        {
            const bookInfo = await BookService.getFavoriteBook(favoriteBooksId[i].bookId);
            favoriteBooksInfo.push(bookInfo);
        }

        return favoriteBooksInfo
    }

    async deleteFavoriteBook(bookId, userId){
        await FavoriteBookModel.deleteOne({bookId, userId});
    }
}

export default new UserService();
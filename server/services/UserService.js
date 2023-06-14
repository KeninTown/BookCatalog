import ApiError from "../exeptions/ApiError.js";
import FavoriteBookModel from "../models/FavoriteBookModel.js";
import BookService from "./BookService.js";
import UserModel from "../models/UserModel.js";
import TokenService from "./TokenService.js";
import UserDto from "../dtos/UserDto.js";

class UserService{
    async changeEmail(){

    }

    async changeUsername(username, userId){
        const user = await UserModel.findById(userId);
        console.log(user);

        if(!user)
            throw ApiError.BadRequest('No user with such id');
        
        const existUser = await UserModel.findOne({username});
        if(existUser)
            throw ApiError.BadRequest('Username already taken');

        user.username = username;

        await user.save();

        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...userDto});

        await TokenService.saveRefreshToken(tokens.refreshToken);
        
        return {...tokens, user: userDto};
    }

    async changePassword(){
        
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
import ApiError from "../exeptions/ApiError.js";
import FavoriteBookModel from "../models/FavoriteBookModel.js";
import BookService from "./BookService.js";
import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import { v4 } from "uuid";
import DropBoxV2Service from "./DropBoxV2Service.js";
import stream from 'stream'

class UserService{
    //получение информации о юзере
    async getUser(id){ 
        const user = await UserModel.findById(id).select('-__v');

        if(!user)
            throw ApiError.BadRequest('Invalid user id');
        
        return user;
    }

    async getUsers(){ 
        const users = await UserModel.find();
        return users;
    }

    //получение лого юзера из Dropbox
    async getLogo(id){
        const user = await UserModel.findById(id);
        if(!user)
            throw ApiError.BadRequest('Invalid user id');

        const logoName = user.logo;
        
        const logoStream = await DropBoxV2Service.getLogo(logoName);
        
        return  logoStream;
    }

    //загрузка лого юзера из Dropbox
    async uploadLogo(id, file){
        if(file.size > 2097152)
            throw ApiError.BadRequest('File is too big. File size should me less or equal 2 MB')
        const user = await UserModel.findById(id);
        if(!user)
            throw ApiError.BadRequest('Invalid user id');

        let logoName = user.logo;
        
        if(logoName === 'default.jpg')
        {
            logoName = v4() + '.jpg';
            user.logo = logoName;
            await user.save();
        }
        else{
            await DropBoxV2Service.deleteLogo(logoName);
        }

        const fileStream = stream.Readable.from(file.buffer);
        await DropBoxV2Service.uploadLogo(logoName, fileStream);
    }

    async deleteLogo(id){
        const user = await UserModel.findById(id)

        if(!user)
            throw ApiError.BadRequest('Invalid user id');

        await DropBoxV2Service.deleteLogo(user.logo);

        user.logo = 'default.jpg'

        await user.save();
    }

    //изменение почты
    async changeEmail(email, userId){
        const user = await UserModel.findById(userId);

        if(!user)
            throw ApiError.BadRequest('Invalid user id');
        
        const existUser = await UserModel.findOne({email});
        if(existUser)
            throw ApiError.BadRequest('Email already taken');

        user.email = email;

        await user.save();
    }

    //изменение никнейма
    async changeUsername(username, userId){

        const user = await UserModel.findById(userId);

        if(!user)
            throw ApiError.BadRequest('Invalid user id');
        
        const existUser = await UserModel.findOne({username});
        if(existUser)
            throw ApiError.BadRequest('Username already taken');

        user.username = username;

        await user.save();
    }

    //изменение пароля
    async changePassword(password, userId){
        const user = await UserModel.findById(userId);

        if(!user)
            throw ApiError.BadRequest('Invalid user id')

        const hashedPassword = await bcrypt.hash(password, 7);
        user.password = hashedPassword;
        await user.save();
    }

    //проверка пароля
    async checkPassword(password, id){
        const user = await UserModel.findById(id);
        if(!user)
            throw ApiError.BadRequest('Invalid user id')
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch)
            throw ApiError.BadRequest('Invalid password');
    }

    //добавление любимой книги пользователя
    async chooseFavoriteBook(bookId, userId){
        const isFavorite = await FavoriteBookModel.findOne({bookId, userId});
        console.log(isFavorite);
        if(isFavorite)
            throw ApiError.BadRequest('Book already in favorites');
        await FavoriteBookModel.create({bookId, userId});
    }

    //получение любимых книг пользователя
    async getFavoriteBook(limit, page, userId){
        const favoriteBooks = await FavoriteBookModel.find({userId}).select('bookId -_id');

        if(!favoriteBooks)
            throw ApiError.BadRequest('User has not any favorite book');

        const books = await BookService.getBooks(limit, page, null, null, favoriteBooks);

        return books
    }

    //удаление любимой книги пользователя
    async deleteFavoriteBook(bookId, userId){
        await FavoriteBookModel.deleteOne({bookId, userId});
    }
}

export default new UserService();
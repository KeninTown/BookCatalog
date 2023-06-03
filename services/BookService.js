import fetch from "node-fetch";
import BookDto from "../dtos/BookDto.js";
import mongoose from "mongoose";
import BookModel from "../models/BookModel.js"

class BookService{
    async getBooks(amount){
        try {    
            const books = await BookModel.find().limit(amount).select('-__v');
            return books;
        } catch (error) {
            console.log(error);
        }
    }

    async getOne(id){
        try {
            const book = await BookModel.findById(id).select('-__v');
            return book;  
        } catch (error) {
            console.log(error);
        }
    }
}

export default new BookService();
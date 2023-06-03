import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
   title:{type:String, required:true},
   authors:{type:[String], required:true},
   genre:{type:[String]},
   description:{type:String},
   publisher: {type:String},
   publishedDate:{type:String},
   pageCount:{type:Number},
   maturityRating:{type:String},
   img:{type:{}}
});

export default mongoose.model('BookModel', bookSchema);
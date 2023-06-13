import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

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

bookSchema.plugin(paginate);

export default mongoose.model('Book', bookSchema);
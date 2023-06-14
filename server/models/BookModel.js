import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const bookSchema = new mongoose.Schema({
   title:{type:String, required:true},
   authors:{type:[String], default: []},
   painters:{type:[String], default: []},
   translaters:{type:[String], default: []},
   bookSeries:{type:String},
   bookBinding: {type:String},
   genres:{type:[String], default: []},
   description:{type:String},
   publisher: {type:String},
   publishedDate:{type:String},
   pageCount:{type:Number},
   img:{type:{
      smallFingernail: String,
      mediumFingernail: String,
      largeFingernail: String
   }}
});

bookSchema.plugin(paginate);

export default mongoose.model('Book', bookSchema);
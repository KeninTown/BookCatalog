import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    book: {type: mongoose.Types.ObjectId, required: true, ref: 'BookModel'},
    user: {type: mongoose.Types.ObjectId, required: true, ref: 'UserModel'},
    title: {type: String, required: true},
    text: {type: String, required: true},
});

export default mongoose.model('ReviewModel', reviewSchema);
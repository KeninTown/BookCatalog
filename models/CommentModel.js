import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    bookId: {type: mongoose.Types.ObjectId, required: true, ref: 'BookModel'},
    userId: {type: mongoose.Types.ObjectId, required: true, ref: 'UserModel'},
    title: {type: String, required: true},
    text: {type: String, required: true},
});

export default mongoose.model('CommentModel', commentSchema);
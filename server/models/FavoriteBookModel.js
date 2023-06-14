import mongoose from "mongoose";

const favoriteBookSchema = new mongoose.Schema({
    bookId: {type: mongoose.Types.ObjectId, required: true, ref: 'BookModel'},
    userId: {type: mongoose.Types.ObjectId, required: true, ref: 'UserModel'},
});

export default mongoose.model('favoriteBook', favoriteBookSchema);
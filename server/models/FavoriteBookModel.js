import mongoose from "mongoose";

const favoriteBookSchema = new mongoose.Schema({
    bookId: {type: mongoose.Types.ObjectId, required: true, ref: 'Book'},
    userId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
});

export default mongoose.model('favoriteBook', favoriteBookSchema);
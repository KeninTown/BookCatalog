import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    bookId: {type: mongoose.Types.ObjectId, required: true, ref: 'Book'},
    userId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    title: {type: String, required: true},
    text: {type: String, required: true},
    rating: {type: Number, required: true},
    likes: {type:[String], default: []},
    dislikes: {type:[String], default: []},
    date:{type:Number, default: Date.now() + 10800000}
});

export default mongoose.model('Comment', commentSchema);
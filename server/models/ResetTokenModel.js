import mongoose from "mongoose";

const resetTokenSchema = new mongoose.Schema({
    user:{type: mongoose.Types.ObjectId, required:true, ref: 'User'},
    resetToken: {type:String, required: true},
    creationTime: {type: Number, default: Date.now()}
})

export default mongoose.model('ResetToken', resetTokenSchema);
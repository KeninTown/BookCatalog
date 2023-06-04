import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    user:{type: mongoose.Types.ObjectId, required:true},
    refreshToken: {type:String, required: true}
})

export default mongoose.model('TokenModel', tokenSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{type:String, required: true, unique: true},
    username:{type:String, required: true, unique: true},
    password: {type: String, required: true},
    isActivated:{type:Boolean, default:false},
    roles:[{type: String, ref: 'Role'}],
    activationLink:{type:String},
    logo:{type: String, default: 'default.jpg'}
});

export default mongoose.model('User', userSchema);
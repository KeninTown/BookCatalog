import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
    value: {type: String, required: true, unique: true, default: 'User'}
})

export default mongoose.model('Role', roleSchema);
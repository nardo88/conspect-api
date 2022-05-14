import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    roles: { type: [String], required: true, default: ['user']}
})

export default mongoose.model('Users', userSchema)
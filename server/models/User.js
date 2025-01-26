import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {type:String,requiredL: true},
    name: {type:String,requiredL: true},
    email: {type:String,requiredL: true,unique: true},
    resume: {type:String},
    image: {type:String, required: true}
})

const User = mongoose.model('User',userSchema)

export default User;
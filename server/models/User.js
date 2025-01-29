import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Use correct 'required' property
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String, default: "" }, // Default value to prevent unset issues
  image: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
export default User;

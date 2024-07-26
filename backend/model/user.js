import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, minLength: 4, maxLength: 20 },
  password: {},
});

const User = mongoose.model("User", userSchema);
export default User;

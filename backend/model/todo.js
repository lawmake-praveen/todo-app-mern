import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String },
  description: { type: String },
  completed: { type: Boolean },
  createdDate: { type: String, default: `${Date.now()}` },
  updatedDate: { type: String },
  authorId: { type: Number },
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;

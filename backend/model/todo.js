import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String },
  description: { type: String },
  completed: { type: Boolean },
  createdDate: { type: Date },
  updatedDate: { type: Date },
  authorId: { type: Number },
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;

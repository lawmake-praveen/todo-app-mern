import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Todo from "./model/todo.js";
import { connectDatabase } from "./config/db.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;
const MongoURL = process.env.MONGOURL;

app.use(express.json());
app.use(cors());

const todos = [
  {
    id: 0,
    title: "First todo",
    description:
      "First todo Description First todo Description First todo Description First todo Description First todo Description First todo Description ",
    completed: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    authorId: 1,
  },
  {
    id: 1,
    title: "Second todo",
    description:
      "Second todo Description Second todo Description Second todo Description Second todo Description Second todo Description Second todo Description ",
    completed: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    authorId: 2,
  },
  {
    id: 2,
    title: "Third todo",
    description:
      "Third todo Description Third todo Description Third todo Description Third todo Description Third todo Description Third todo Description ",
    completed: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    authorId: 3,
  },
];

app.get("/", (req, res) => {
  console.log(`=== ${req}`);
  res.status(200).send(`HI this application is running in ${port}`);
});

app.get("/api/getTodos", async (req, res) => {
  res.status(200).send(todos);
});

app.delete("/api/deleteTodo/:id", (req, res) => {
  const id = req.params.id;
  console.log(`id : ${id}`);

  const todo = todos.findIndex((todo) => todo.id == id);
  todos.splice(todo, 1);
  console.log(`todo : ${todo}`);
  res.status(200).send({ message: "Todo deleted successfully", todo: todo });
});

app.post("/api/createTodo", async (req, res) => {
  var body = req.body;

  try {
    console.log(`body : ${JSON.stringify(body)}`);
    // const newTodo = new Todo({
    //   title: `${body.title}`,
    //   description: `${body.title}`,
    //   completed: `body.completed`,
    //   createdDate: body.createdDate,
    //   updatedDate: body.updatedDate,
    //   authorId: body.authorId,
    // });
    // console.log(`todo : ${newTodo}`);
    // const savedTodo = await newTodo.save();
    // console.log(`result : ${savedTodo}`);

    var todo = {
      ...req.body,
      id: Math.random() * 20000,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    console.log(`New Todo : : ${JSON.stringify(todo)}`);
    todos.push(todo);

    res.status(200).json(todo);
  } catch (error) {
    console.log(`Could not create todo : ${error}`);
    res.status(500).json({ message: "Something went wrong. Please try again" });
  }
});

app.put("/api/updateTodo/:id", async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  console.log(`required param id : ${id}`);
  console.log(`required body : ${JSON.stringify(body)}`);
  const index = todos.findIndex((item) => item.id == id);
  console.log(`selected item : ${JSON.stringify(todos[index])}`)
  if (index !== -1) {
    todos[index] = {...todos[index], ...body};
    res.status(200).send(body);
  }
});

app.listen(port, async () => {
  console.log(`Port is running in ${port}`);
  // console.log(`connecting DB : ${MongoURL}`);
  // await connectDatabase();
});

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

app.get("/", (req, res) => {
  console.log(`=== ${req}`);
  res.status(200).send(`HI this application is running in ${port}`);
});

app.get("/api/getTodos", async (req, res) => {
  var data = await Todo.find();
  res.status(200).send({ message: "The users list is sent" });
});

app.post("/api/createTodo", async (req, res) => {
  var body = req.body;

  try {
    console.log(`body : ${JSON.stringify(body)}`);
    const newTodo = new Todo({
      title: `${body.title}`,
      description: `${body.title}`,
      completed: `body.completed`,
      createdDate: body.createdDate,
      updatedDate: body.updatedDate,
      authorId: body.authorId,
    });
    console.log(`todo : ${newTodo}`);
    const savedTodo = await newTodo.save();
    console.log(`result : ${savedTodo}`);
    res.json(savedTodo);
  } catch (error) {
    console.log(`Could not create todo : ${error}`);
    res.status(500).json({ message: "Something went wrong. Please try again" });
  }
});

app.listen(port, async () => {
  console.log(`Port is running in ${port}`);
  console.log(`connecting DB : ${MongoURL}`);
  await connectDatabase();
});

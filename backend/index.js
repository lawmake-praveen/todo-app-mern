import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log(`=== ${req}`);
  res.status(200).send(`HI this application is running in ${port}`);
});

app.get("/api/getTodos", (req, res) => {
  res.status(200).send({ message: "The users list is sent" });
});

app.listen(port, () => {
  console.log(`Port is running in ${port}`);
});

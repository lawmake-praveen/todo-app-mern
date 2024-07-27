import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MongoURL = process.env.MONGOURL;

export const connectDatabase = async () => {
  console.log(`Mongo Url : ${MongoURL}`);
  await mongoose
    .connect(MongoURL)
    .then(() => {
      console.log("DB connection successful...");
    })
    .catch((err) => console.log(`DB connection failed... ${err}`));
};

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/UserRouter";
import ReminderRouter from "./routes/reminderRouter";

dotenv.config();

const url = process.env.URL || "";
const app = express();
const mongoose = require("mongoose");
app.use(cors());

mongoose
  .connect(url)
  .then(() => console.log("MongoDB connected"))
  .catch((err: any) => console.log(err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.json());
app.use("/", userRouter);
app.use("/", ReminderRouter);

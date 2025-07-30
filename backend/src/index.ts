import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { ExercisePlannerResponse } from "./DataTypes";
import dotenv from "dotenv";
import userRouter from "../routes/UserRouter";
import ReminderRouter from "../routes/reminderRoutes";
import SymptomRouter from "../routes/symptomRouter";
import isAuthenticated from "./middleware/isAuth";

dotenv.config();
import './remainderScheduler';
const url = process.env.URL || "";
const app = express();
const mongoose=require('mongoose')

app.use(cors());
import path from 'path';
import { startReminderEmailJob } from "./remainderScheduler";
import PostRouter from "../routes/communityRouter";


// after your app and db init


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
app.use("/", SymptomRouter);
app.use("/", PostRouter);

app.use('/uploads', express.static( 'uploads'));
startReminderEmailJob();



app.get("/test-auth", isAuthenticated, (req: Request, res: Response) => {
  res.json({ message: "Auth successful", user: req.user });
});


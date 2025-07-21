const express = require("express");

import ReminderControl from "../src/controllers/reminderController";

import isAuthenticated from "../src/middleware/isAuth";

const ReminderRouter = express.Router();
ReminderRouter.post("/add-reminder", isAuthenticated, ReminderControl.add);
ReminderRouter.get("/get-reminder", isAuthenticated, ReminderControl.get);
ReminderRouter.delete("/delete-reminder/:id",isAuthenticated, ReminderControl.delete);
ReminderRouter.put("/update-reminder/:id",isAuthenticated, ReminderControl.update);


export default ReminderRouter;



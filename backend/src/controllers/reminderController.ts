import { Request, Response } from "express";
import Reminder from "../../model/reminder";

const ReminderControl = {
  add: async (req: Request, res: Response) => {
    try {
      const { reminderTime } = req.body;
      console.log("🧪 req.user:", req.user); 
      const reminderCreated = await Reminder.create({
        userId: req.user?.id,
        reminderTime,
        message: req.body.message || "Time to exercise!",
      });
      
     
      res.status(201).json({
        message: req.body.message || "Time to exercise!",
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message || "Internal server error" });
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const reminders = await Reminder.find({ userId: req.user?.id }).sort({
        createdAt: -1,
      });
    
      res.status(200).json(reminders);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const reminderId = req.params.id;
      const reminder = await Reminder.findById(reminderId);

      if (!reminder) {
        return res.status(404).json({ message: "Reminder not found." });
      }

      if (reminder.userId.toString() !== req.user?.id) {
        return res
          .status(403)
          .json({ message: "Unauthorized to delete this reminder." });
      }

      await Reminder.findByIdAndDelete(reminderId);

      return res
        .status(200)
        .json({ message: "Reminder deleted successfully." });
    } catch (err: any) {
      res.status(500).json({ message: err.message || "Internal server error" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const reminderId = req.params.id;
      const update = await Reminder.findByIdAndUpdate(
        reminderId,
        { notified: true },
        { new: true }
      );

      if (!update) {
        return res.status(404).json({ message: "Reminder not found." });
      }
      
      return res
        .status(200)
        .json({ message: "Reminder updated successfully." });
    } catch (err: any) {
      res.status(500).json({ message: err.message || "Internal server error" });
    }




  },
};

export default ReminderControl;

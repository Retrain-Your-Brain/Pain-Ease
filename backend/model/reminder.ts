import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reminderTime: { type: Date, required: true },
    message: { type: String, default: "time to exercise!" },
    notified: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "done"], default: "pending" },
  },
  {
    timestamps: true,
  }
);

const Reminder = mongoose.model("Reminder", ReminderSchema);
export default Reminder;

import mongoose from "mongoose";

const symptomSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: () => new Date(), required: true },
  painScale: { type: Number, required: true, min: 0, max: 10 },
  notes: { type: String, default: "" },
  water: Number,
  weight: Number,
  suggestPlanChange:{ type: Boolean, default: false },
});

const Symptom = mongoose.model("Symptom", symptomSchema);

export default Symptom;


import { Schema, model, models } from "mongoose";

const examResultSchema = new Schema({
  examClass: { type: String, enum: ["X", "XII"], required: true },
  year: { type: String, required: true },
  registered: { type: Number, required: true },
  passed: { type: Number, required: true },
  percentage: { type: String, required: true },
  remarks: { type: String, default: "-" },
  sno: { type: Number, required: true },
}, { timestamps: true });

const ExamResult = models.ExamResult || model("ExamResult", examResultSchema);
export default ExamResult;

import  { Schema, model, models } from "mongoose";

const tcSchema = new Schema({
  studentName: { type: String, required: true },
  studentClass: { type: String, required: true },
  admissionNumber: { type: String, required: true },
  tcUrl: { type: String, required: true },
  public_id: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const TC = models.TC || model("TC", tcSchema);
export default TC;

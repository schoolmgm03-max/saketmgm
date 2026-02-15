import mongoose, { Schema, models } from "mongoose";

const AdmissionSchema = new Schema(
  {
    fullName: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    className: { type: String, required: true },
    caste: { type: String, required: true },
    fatherName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String },
    occupation: { type: String },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const Admission = models.Admission || mongoose.model("Admission", AdmissionSchema);
export default Admission;

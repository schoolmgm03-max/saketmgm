import  { Schema, model, models } from "mongoose";

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    message: { type: String, required: true },
    image: { type: String, required: true },       // Cloudinary URL
    public_id: { type: String, required: true },   // Cloudinary Public ID
  },
  { timestamps: true }
);

const Testimonial =
  models.Testimonial || model("Testimonial", TestimonialSchema);

export default Testimonial;

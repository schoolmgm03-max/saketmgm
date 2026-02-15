import  { Schema, model, models } from "mongoose";

const NewsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Cloudinary URL
      required: true,
    },
    public_id: {
      type: String, // Cloudinary public_id
      required: true,
    },
    date: {
      type: String, // or Date
      required: true,
    },
    category: {
      type: String,
      enum: ["Events", "Announcements", "Academics", "General"],
      default: "General",
    },
  },
  { timestamps: true }
);

export const News = models.News || model("News", NewsSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
  url: string;          // YouTube / Cloudinary / mp4 link
  title: string;
  description?: string;
  category?: string;
  duration?: number;    // optional: in seconds
  createdAt: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    duration: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.Video ||
  mongoose.model<IVideo>("Video", VideoSchema);

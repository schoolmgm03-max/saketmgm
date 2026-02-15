import  { Schema, models, model } from 'mongoose';

const HeroImageSchema = new Schema({
  imageUrl: { type: String, required: true },
}, { timestamps: true });

export default models.HeroImage || model('HeroImage', HeroImageSchema);

import { Schema, model, models } from "mongoose";

const disclosureSchema = new Schema({
  schoolInfo: [
    {
      id: { type: Number, required: true },
      label: { type: String, required: true },
      value: { type: String, required: true }
    }
  ],
  documents: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      file: { type: String, required: true }
    }
  ],
  academicDocs: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      file: { type: String, required: true }
    }
  ],
  staffDetails: [
    {
      id: { type: Number, required: true },
      label: { type: String, required: true },
      value: { type: String, required: true },
      isList: { type: Boolean, default: false }
    }
  ],
  infrastructureDetails: [
    {
      id: { type: Number, required: true },
      label: { type: String, required: true },
      value: { type: String, required: true },
      isLabs: { type: Boolean, default: false },
      isYoutube: { type: Boolean, default: false }
    }
  ],
  staffPgtCount: { type: String, default: "17" },
  staffTgtCount: { type: String, default: "24" },
  staffPrtCount: { type: String, default: "39" },
  staffNttCount: { type: String, default: "34" },
  staffListFile: { type: String, default: "#" },
  labs: [
    {
      name: { type: String, required: true },
      size: { type: String, required: true }
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});

const MandatoryDisclosure = models.MandatoryDisclosure || model("MandatoryDisclosure", disclosureSchema);
export default MandatoryDisclosure;

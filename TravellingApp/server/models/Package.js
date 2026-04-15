import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    price: Number,
    duration: String,
    description: String,
    images: [String],
    availableSlots: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Package", packageSchema);

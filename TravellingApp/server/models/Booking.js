import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    package: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
    paymentStatus: { type: String, default: "pending" },
    status: { type: String, default: "confirmed" },
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    turf: { type: mongoose.Schema.Types.ObjectId, ref: "Turf" },
    timeSlot: { type: mongoose.Schema.Types.ObjectId, ref: "TimeSlot" },
    totalPrice: { type: Number, required: true },
    qrCode: { type: String, required: true },
    payment: {
      orderId: { type: String, required: true },
      paymentId: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);

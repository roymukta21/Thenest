import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    serviceId: { type: String, required: true },
    serviceName: { type: String, required: true },
    duration: { type: Number, required: true },
    location: { type: String, required: true },
    totalCost: { type: Number, required: true },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);

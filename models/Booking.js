import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userEmail: String,
    serviceName: String,
    duration: Number,
    location: String,
    totalCost: Number,
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true, // VERY IMPORTANT (adds createdAt & updatedAt)
  }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);

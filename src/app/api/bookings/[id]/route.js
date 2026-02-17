import { NextResponse } from "next/server";
import Booking from "../../../../../models/Booking";
import connectDB from "../../../../../lib/db";
import { mockDB } from "../../../../../lib/mockDB";

// Flag to track if MongoDB is available
let mongoDBAvailable = true;

export async function DELETE(req, { params }) {
  try {
    // Await params in Next.js 15+
    const { id } = await params;

    let booking;

    // Try to use MongoDB
    if (mongoDBAvailable) {
      try {
        await connectDB();
        booking = await Booking.findByIdAndDelete(id);
        
        if (!booking) {
          return NextResponse.json(
            { success: false, message: "Booking not found" },
            { status: 404 }
          );
        }

        return NextResponse.json({
          success: true,
          message: "Booking cancelled",
        });
      } catch (dbError) {
        console.error("❌ MongoDB connection failed:", dbError.message);
        console.log("⚠️  Falling back to mock database for development");
        mongoDBAvailable = false;
      }
    }

    // Fallback to mock database
    if (!mongoDBAvailable) {
      console.log("📦 Using mock database (MongoDB unavailable)");
      booking = await mockDB.deleteBooking(id);
      
      if (!booking) {
        return NextResponse.json(
          { success: false, message: "Booking not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Booking cancelled",
      });
    }

  } catch (error) {
    console.error("DELETE /api/bookings/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

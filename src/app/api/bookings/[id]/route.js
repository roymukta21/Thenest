import { NextResponse } from "next/server";
import Booking from "../../../../../models/Booking";
import connectDB from "../../../../../lib/db";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    // Await params in Next.js 15+
    const { id } = await params;

    const booking = await Booking.findByIdAndDelete(id);

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
  } catch (error) {
    console.error("DELETE /api/bookings/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

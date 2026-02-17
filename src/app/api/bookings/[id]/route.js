import { NextResponse } from "next/server";
import Booking from "../../../../../models/Booking";
import connectDB from "../../../../../lib/db";


export async function DELETE(req, { params }) {
  try {
    await connectDB();

    await Booking.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: "Booking cancelled",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

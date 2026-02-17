import { NextResponse } from "next/server";
import sendInvoice from "../../../../lib/sendEmail";
import connectDB from "../../../../lib/db";
import Booking from "../../../../models/Booking";

// GET user bookings
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const bookings = await Booking.find({ userEmail: email }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("GET /api/bookings error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// CREATE booking + send invoice
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.userEmail || !body.serviceId) {
      return NextResponse.json(
        { success: false, message: "userEmail and serviceId are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const booking = await Booking.create(body);

    // Send invoice email, wrapped in try/catch to prevent crash
    try {
      await sendInvoice(body.userEmail, booking);
    } catch (emailErr) {
      console.error("sendInvoice error:", emailErr);
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (err) {
    console.error("POST /api/bookings error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import sendInvoice from "../../../../lib/sendEmail";
import connectDB from "../../../../lib/db";
import Booking from "../../../../models/Booking";

// GET user bookings
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const bookings = await Booking.find({ userEmail: email }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

//  CREATE booking + send invoice
export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const booking = await Booking.create(body);

    //  send invoice email
    await sendInvoice(body.userEmail, booking);

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

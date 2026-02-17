import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");

  if (
    !token &&
    (request.nextUrl.pathname.startsWith("/booking") ||
      request.nextUrl.pathname.startsWith("/my-bookings"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

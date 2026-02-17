"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "@/components/PrivateRoute";
import { auth } from "../../../lib/firebaseClient";
//import { auth } from "../../../lib/firebase";

function MyBookingsContent() {
  const [bookings, setBookings] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  // ✅ get logged user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUserEmail(user.email);
    });
    return () => unsub();
  }, []);

  // ✅ fetch bookings
  useEffect(() => {
    if (!userEmail) return;

    fetch(`/api/bookings?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => setBookings(data.data || []));
  }, [userEmail]);

  // ✅ cancel booking
  const handleCancel = async (id) => {
    const confirm = window.confirm("Cancel this booking?");
    if (!confirm) return;

    await fetch(`/api/bookings/${id}`, {
      method: "DELETE",
    });

    setBookings((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 && (
        <p>No bookings found.</p>
      )}

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border p-5 rounded-xl flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">
                {booking.serviceName}
              </h2>
              <p>Duration: {booking.duration}</p>
              <p>Location: {booking.location}</p>
              <p>Total: ৳{booking.totalCost}</p>
              <p className="font-medium">
                Status: {booking.status}
              </p>
            </div>

            <button
              onClick={() => handleCancel(booking._id)}
              className="btn btn-error"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}

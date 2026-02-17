"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "@/components/PrivateRoute";
import { auth } from "../../../lib/firebaseClient";
//import { auth } from "../../../lib/firebase";

function MyBookingsContent() {
  const [bookings, setBookings] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ get logged user
  useEffect(() => {
    if (!auth) {
      console.warn("Firebase auth not initialized. Please check environment variables.");
      return;
    }
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUserEmail(user.email);
    });
    return () => unsub();
  }, []);

  // ✅ fetch bookings
  useEffect(() => {
    if (!userEmail) return;

    setLoading(true);
    setError("");

    fetch(`/api/bookings?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBookings(data.data || []);
          // Silently handle mock database - no warning shown to user
        } else {
          setError(data.message || "Failed to load bookings");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to connect to server");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userEmail]);

  // ✅ cancel booking
  const handleCancel = async (id) => {
    const confirm = window.confirm("Cancel this booking?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        alert(data.message || "Failed to cancel booking");
      }
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {loading && <p className="text-gray-600">Loading bookings...</p>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <p className="text-sm mt-2">
            Please check your MongoDB connection or contact support.
          </p>
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
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

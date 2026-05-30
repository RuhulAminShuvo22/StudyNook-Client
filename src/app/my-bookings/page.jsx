"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiXCircle,
} from "react-icons/fi";

const MyBookingsPage = () => {
  const { data: session } = authClient.useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.user?.email) return;

      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/bookings/user/${session.user.email}`
        );

        const data = await res.json();

        setBookings(data);
      } catch (error) {
        console.log(error);

        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session]);

  const handleCancelBooking = async (bookingId) => {
    try {
      setCancelLoading(bookingId);

      const res = await fetch(
        `http://localhost:5000/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                status: "cancelled",
              }
            : booking
        )
      );

      toast.success("Booking cancelled successfully");
    } catch (error) {
      console.log(error);

      toast.error("Failed to cancel booking");
    } finally {
      setCancelLoading(null);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">
          Please login first
        </h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-emerald-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-black text-slate-800">
            My Bookings
          </h1>

          <p className="text-slate-500 mt-3">
            Total Bookings: {bookings.length}
          </p>
        </div>

        {/* EMPTY STATE */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-[30px] p-12 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-slate-700">
              No bookings found
            </h2>

            <p className="text-slate-500 mt-3">
              You have not booked any room yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="bg-white rounded-[30px] shadow-lg overflow-hidden border border-slate-100"
              >
                <div className="grid lg:grid-cols-4 gap-0">

                  {/* IMAGE */}
                  <div className="relative h-[250px] lg:h-full">
                    <Image
                      src={booking.roomImage}
                      alt={booking.roomName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="lg:col-span-3 p-8">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                      <div>
                        <h2 className="text-3xl font-black text-slate-800">
                          {booking.roomName}
                        </h2>

                        <p className="text-slate-500 mt-2">
                          Booking ID: {booking._id}
                        </p>
                      </div>

                      <span
                        className={`px-5 py-2 rounded-full text-sm font-bold ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5 mt-8">

                      <div className="bg-cyan-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-cyan-600">
                          <FiCalendar />
                          <span>Date</span>
                        </div>

                        <h4 className="font-bold mt-2">
                          {booking.bookingDate}
                        </h4>
                      </div>

                      <div className="bg-emerald-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-emerald-600">
                          <FiClock />
                          <span>Time</span>
                        </div>

                        <h4 className="font-bold mt-2">
                          {booking.startTime} - {booking.endTime}
                        </h4>
                      </div>

                      <div className="bg-orange-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-orange-600">
                          <FiDollarSign />
                          <span>Total Cost</span>
                        </div>

                        <h4 className="font-bold mt-2">
                          ${booking.totalCost}
                        </h4>
                      </div>
                    </div>

                    {booking.specialNote && (
                      <div className="mt-6 bg-slate-50 rounded-2xl p-4">
                        <h4 className="font-bold mb-2">
                          Special Note
                        </h4>

                        <p className="text-slate-600">
                          {booking.specialNote}
                        </p>
                      </div>
                    )}

                    {booking.status === "confirmed" && (
                      <div className="mt-6">
                        <button
                          onClick={() =>
                            handleCancelBooking(
                              booking._id
                            )
                          }
                          disabled={
                            cancelLoading ===
                            booking._id
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition"
                        >
                          <FiXCircle />

                          {cancelLoading ===
                          booking._id
                            ? "Cancelling..."
                            : "Cancel Booking"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookingsPage;
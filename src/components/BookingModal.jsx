"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FiX, FiCalendar, FiClock, FiDollarSign } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const BookingModal = ({ room, onClose, onSuccess }) => {
  const { data: session } = authClient.useSession();

  const today = new Date().toISOString().split("T")[0];

  const [bookingDate, setBookingDate] = useState(today);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [loading, setLoading] = useState(false);

  const timeSlots = [];

  for (let i = 8; i <= 20; i++) {
    timeSlots.push(`${String(i).padStart(2, "0")}:00`);
  }

  const endTimeOptions = timeSlots.filter(
    (time) => startTime && time > startTime
  );

  const totalCost = useMemo(() => {
    if (!startTime || !endTime) return 0;

    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]);

    return (endHour - startHour) * Number(room.hourlyRate);
  }, [startTime, endTime, room.hourlyRate]);

  const handleBooking = async () => {
    if (!bookingDate) {
      return toast.error("Please select a date");
    }

    if (!startTime) {
      return toast.error("Please select start time");
    }

    if (!endTime) {
      return toast.error("Please select end time");
    }

    if (!session?.user?.email) {
      return toast.error("Please login first");
    }

    try {
      setLoading(true);

      const bookingData = {
        roomId: room._id,
        roomName: room.roomName,
        roomImage: room.imageUrl,

        userName: session.user.name,
        userEmail: session.user.email,
        userImage: session.user.image,

        bookingDate,
        startTime,
        endTime,

        totalCost,

        specialNote,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return toast.error(
          data.message || "Booking failed"
        );
      }

      toast.success(
        "Room booked successfully!"
      );

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error) {
      console.log(error);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{
            scale: 0.9,
            opacity: 0,
            y: 40,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{
            scale: 0.9,
            opacity: 0,
          }}
          className="w-full max-w-2xl bg-white rounded-[35px] overflow-hidden shadow-2xl border border-cyan-100"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-cyan-500 to-emerald-500 p-8 text-white">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
            >
              <FiX size={20} />
            </button>

            <h2 className="text-3xl font-black">
              Book Room
            </h2>

            <p className="mt-2 text-white/90">
              {room.roomName}
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Date */}
            <div>
              <label className="font-bold text-slate-700 flex items-center gap-2 mb-3">
                <FiCalendar />
                Booking Date
              </label>

              <input
                type="date"
                min={today}
                value={bookingDate}
                onChange={(e) =>
                  setBookingDate(
                    e.target.value
                  )
                }
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-500"
              />
            </div>

            {/* Time */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="font-bold text-slate-700 flex items-center gap-2 mb-3">
                  <FiClock />
                  Start Time
                </label>

                <select
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(
                      e.target.value
                    );
                    setEndTime("");
                  }}
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3"
                >
                  <option value="">
                    Select Start Time
                  </option>

                  {timeSlots.map(
                    (slot) => (
                      <option
                        key={slot}
                        value={slot}
                      >
                        {slot}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 flex items-center gap-2 mb-3">
                  <FiClock />
                  End Time
                </label>

                <select
                  value={endTime}
                  onChange={(e) =>
                    setEndTime(
                      e.target.value
                    )
                  }
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3"
                >
                  <option value="">
                    Select End Time
                  </option>

                  {endTimeOptions.map(
                    (slot) => (
                      <option
                        key={slot}
                        value={slot}
                      >
                        {slot}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="font-bold text-slate-700 mb-3 block">
                Special Note
              </label>

              <textarea
                rows={4}
                value={specialNote}
                onChange={(e) =>
                  setSpecialNote(
                    e.target.value
                  )
                }
                placeholder="Any special requirements..."
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 resize-none"
              />
            </div>

            {/* Cost */}
            <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-3xl p-6 border border-cyan-100">
              <div className="flex items-center gap-3">
                <FiDollarSign
                  size={24}
                  className="text-emerald-600"
                />

                <div>
                  <p className="text-slate-500 text-sm">
                    Total Cost
                  </p>

                  <h3 className="text-3xl font-black text-emerald-600">
                    ${totalCost}
                  </h3>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 border border-slate-200 py-4 rounded-2xl font-bold"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={
                  handleBooking
                }
                className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white py-4 rounded-2xl font-bold hover:scale-[1.02] transition"
              >
                {loading
                  ? "Booking..."
                  : "Confirm Booking"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
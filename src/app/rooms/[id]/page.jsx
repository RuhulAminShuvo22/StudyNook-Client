"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  //FiArrowLeft,
  FiMapPin,
  FiUsers,
  FiEdit,
  FiTrash2,
  FiBookmark,
  FiCalendar,
  FiStar,
} from "react-icons/fi";

const RoomDetailsPage = () => {
  const params = useParams();
  const id = params?.id;

  const router = useRouter();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH ROOM
  useEffect(() => {
    if (!id) return;

    const fetchRoom = async () => {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:5000/rooms/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch room");
        }

        const data = await res.json();

        setRoom(data);
      } catch (error) {
        console.error(error);

        toast.error("Failed to fetch room details 🚨");
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  // 🔥 DELETE ROOM WITH HOT TOAST
  const handleDeleteRoom = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    // ❌ Cancel Toast
    if (!confirmDelete) {
      toast("Delete cancelled ❌");
      return;
    }

    // 🔥 Loading Toast
    const toastId = toast.loading("Deleting room...");

    try {
      const res = await fetch(`http://localhost:5000/rooms/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.deletedCount > 0) {

        // ✅ Success Toast
        toast.success("Room deleted successfully 🗑️", {
          id: toastId,
          duration: 3000,
        });

        // ছোট delay দিলে toast দেখা যাবে
        setTimeout(() => {
          router.push("/rooms");
        }, 1200);

      } else {

        // ❌ Failed Toast
        toast.error("Failed to delete room ❌", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error(error);

      // 🚨 Error Toast
      toast.error("Something went wrong 🚨", {
        id: toastId,
      });
    }
  };

  // 🔥 LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
        <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 🔥 ROOM NOT FOUND
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
        <div className="bg-white/80 backdrop-blur-xl border border-cyan-100 px-10 py-8 rounded-[30px] shadow-xl">
          <h2 className="text-3xl font-black text-red-500">
            Room Not Found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-emerald-50 py-24 px-4">

      {/* 🔥 BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-200/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-emerald-200/30 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-7xl mx-auto"
      >

        {/* 🔥 MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-2">

            {/* IMAGE CARD */}
            <div className="relative h-[300px] md:h-[550px] rounded-[35px] overflow-hidden shadow-2xl border border-white/30">

              <Image
                src={
                  room.imageUrl ||
                  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                }
                alt={room.roomName}
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-700"
                unoptimized
              />

              {/* IMAGE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

              {/* FEATURED BADGE */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-xl text-emerald-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                <FiStar />
                Premium Room
              </div>
            </div>

            {/* CONTENT CARD */}
            <div className="mt-8 bg-white/70 backdrop-blur-2xl border border-cyan-100 rounded-[35px] p-8 md:p-10 shadow-xl">

              {/* TITLE */}
              <div className="flex items-center justify-between flex-wrap gap-4">

                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight">
                    {room.roomName}
                  </h1>

                  <div className="flex items-center gap-2 text-slate-500 mt-4 text-sm font-medium">
                    <FiCalendar />
                    Listed May 22, 2026
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                  {room.bookingCount || 0} bookings
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-10">
                <h3 className="text-2xl font-black text-slate-800 mb-4">
                  Description
                </h3>

                <p className="text-slate-600 leading-relaxed text-lg">
                  {room.description}
                </p>
              </div>

              {/* AMENITIES */}
              <div className="mt-12">
                <h3 className="text-2xl font-black text-slate-800 mb-5">
                  Amenities
                </h3>

                <div className="flex flex-wrap gap-3">
                  {room.amenities?.length > 0 ? (
                    room.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-100 to-emerald-100 text-emerald-700 text-sm font-bold border border-cyan-200 shadow-sm"
                      >
                        {amenity}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500">
                      No amenities added
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="space-y-6">

            {/* PRICE CARD */}
            <div className="bg-white/75 backdrop-blur-2xl border border-cyan-100 rounded-[35px] p-8 shadow-xl">

              {/* PRICE */}
              <div className="mb-8">

                <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-500 to-emerald-600 bg-clip-text text-transparent">
                  ${room.hourlyRate}
                </h2>

                <p className="text-slate-500 mt-2 font-medium">
                  per hour
                </p>
              </div>

              {/* INFO */}
              <div className="space-y-5 mb-8">

                <div className="flex items-center gap-4 bg-cyan-50/70 p-4 rounded-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700">
                    <FiMapPin size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Floor
                    </p>

                    <h4 className="font-bold text-slate-800">
                      {room.floor}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-emerald-50/70 p-4 rounded-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <FiUsers size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Capacity
                    </p>

                    <h4 className="font-bold text-slate-800">
                      Up to {room.capacity} people
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-cyan-50/70 p-4 rounded-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700">
                    <FiBookmark size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Bookings
                    </p>

                    <h4 className="font-bold text-slate-800">
                      {room.bookingCount || 0} total bookings
                    </h4>
                  </div>
                </div>
              </div>

              {/* BOOK BUTTON */}
              <button
                onClick={() => router.push(`/booking/${room._id}`)}
                className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-200 hover:scale-[1.02]"
              >
                Book Now
              </button>

              {/* ACTION BUTTONS */}
              <div className="grid grid-cols-2 gap-4 mt-5">

                {/* EDIT BUTTON */}
                <button
                  onClick={() =>
                    router.push(`/update-room/${room._id}`)
                  }
                  className="border border-cyan-200 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <FiEdit />
                  Edit
                </button>

                {/* DELETE BUTTON */}
                <button
                  onClick={handleDeleteRoom}
                  className="border border-red-200 bg-red-50 hover:bg-red-100 text-red-500 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                >
                  <FiTrash2 />
                  Delete
                </button>
              </div>
            </div>

            {/* HOST CARD */}
            <div className="bg-white/75 backdrop-blur-2xl border border-cyan-100 rounded-[35px] p-8 shadow-xl">

              <h4 className="text-xs uppercase tracking-[4px] text-slate-400 font-black mb-6">
                Listed By
              </h4>

              <div className="flex items-center gap-5">

                {/* AVATAR */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-500 flex items-center justify-center text-white font-black text-2xl shadow-lg">
                  {room?.ownerName?.charAt(0) || "A"}
                </div>

                {/* INFO */}
                <div>
                  <h3 className="font-black text-xl text-slate-800">
                    {room.ownerName || "Anonymous"}
                  </h3>

                  <p className="text-slate-500 text-sm mt-1">
                    {room.ownerEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default RoomDetailsPage;
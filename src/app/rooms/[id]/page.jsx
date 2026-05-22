"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  FiArrowLeft,
  FiMapPin,
  FiUsers,
  FiEdit,
  FiTrash2,
  FiBookmark,
  FiCalendar,
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
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  // 🔥 DELETE ROOM
  const handleDeleteRoom = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/rooms/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.deletedCount > 0) {
        alert("✅ Room deleted successfully");

        router.push("/rooms");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f4ef]">
        <div className="w-12 h-12 border-4 border-[#1e5b4f] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 🔥 ROOM NOT FOUND
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f4ef]">
        <h2 className="text-2xl font-bold text-red-500">
          Room Not Found
        </h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef] py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* 🔙 BACK */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#1e5b4f] font-semibold mb-8 hover:opacity-80 transition-all"
        >
          <FiArrowLeft />
          Back
        </button>

        {/* 🔥 MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2">

            {/* IMAGE */}
            <div className="relative w-full h-[250px] md:h-[500px] rounded-3xl overflow-hidden">
              <Image
                src={
                  room.imageUrl ||
                  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                }
                alt={room.roomName}
                fill
                priority
                className="object-cover"
                unoptimized
              />
            </div>

            {/* CONTENT */}
            <div className="mt-8">

              {/* TITLE */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h1 className="text-4xl font-black text-[#173d35]">
                  {room.roomName}
                </h1>

                <div className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">
                  {room.bookingCount || 0} bookings
                </div>
              </div>

              {/* DATE */}
              <div className="flex items-center gap-2 text-slate-500 mt-2 text-sm">
                <FiCalendar />
                Listed May 22, 2026
              </div>

              {/* DESCRIPTION */}
              <p className="mt-8 text-slate-700 leading-relaxed text-lg">
                {room.description}
              </p>

              {/* AMENITIES */}
              <div className="mt-10">
                <h3 className="text-2xl font-black text-[#173d35] mb-5">
                  Amenities
                </h3>

                <div className="flex flex-wrap gap-3">
                  {room.amenities?.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-[#f4deb2] text-[#5a4300] text-sm font-semibold"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-5">

            {/* BOOKING CARD */}
            <div className="bg-white border border-[#e8ddd0] rounded-3xl p-6 shadow-sm">

              {/* PRICE */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-5xl font-black text-[#1e5b4f]">
                    ${room.hourlyRate}
                  </h2>

                  <p className="text-slate-500 mt-1">
                    per hour
                  </p>
                </div>
              </div>

              {/* INFO */}
              <div className="space-y-5 mb-8">

                <div className="flex items-center gap-3 text-slate-700">
                  <FiMapPin />
                  <span>{room.floor}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <FiUsers />
                  <span>Up to {room.capacity} people</span>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <FiBookmark />
                  <span>{room.bookingCount || 0} total bookings</span>
                </div>
              </div>

              {/* BOOK BUTTON */}
              <button
                onClick={() => router.push(`/booking/${room._id}`)}
                className="w-full bg-[#1e5b4f] hover:bg-[#17473d] text-white font-bold py-4 rounded-2xl transition-all"
              >
                Book Now
              </button>

              {/* EDIT + DELETE */}
              <div className="grid grid-cols-2 gap-3 mt-4">

                {/* 🔥 UPDATE ROOM PAGE BUTTON */}
                <button
                  onClick={() =>
                    router.push(`/update-room/${room._id}`)
                  }
                  className="border border-[#e8ddd0] hover:bg-slate-100 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <FiEdit />
                  Edit
                </button>

                {/* DELETE BUTTON */}
                <button
                  onClick={handleDeleteRoom}
                  className="border border-red-200 text-red-500 hover:bg-red-50 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <FiTrash2 />
                  Delete
                </button>
              </div>
            </div>

            {/* HOST CARD */}
            <div className="bg-white border border-[#e8ddd0] rounded-3xl p-6 shadow-sm">

              <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-5">
                Listed By
              </h4>

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-[#f4ede4] flex items-center justify-center text-[#1e5b4f] font-black text-lg">
                  {room?.ownerName?.charAt(0) || "A"}
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    {room.ownerName || "Anonymous"}
                  </h3>

                  <p className="text-slate-500 text-sm">
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
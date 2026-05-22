"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import {
  FiArrowLeft,
  FiMapPin,
  FiUsers,
  FiBookmark,
  FiCalendar,
  FiX,
} from "react-icons/fi";

const UpdateRoomPage = () => {
  const { id } = useParams();

  const router = useRouter();

  const [room, setRoom] = useState(null);

  // 🔥 FETCH ROOM
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://localhost:5000/rooms/${id}`);

        const data = await res.json();

        setRoom(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoom();
  }, [id]);

  // 🔥 UPDATE ROOM
  const handleUpdateRoom = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedRoom = {
      roomName: form.roomName.value,
      description: form.description.value,
      imageUrl: form.imageUrl.value,
      floor: form.floor.value,
      capacity: Number(form.capacity.value),
      hourlyRate: Number(form.hourlyRate.value),

      amenities: room?.amenities || [],
      bookingCount: room?.bookingCount || 0,
      ownerName: room?.ownerName || "",
      ownerEmail: room?.ownerEmail || "",
    };

    try {
      const res = await fetch(`http://localhost:5000/rooms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRoom),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Room Updated Successfully");

        router.push(`/rooms/${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 LOADING
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#f7f4ef] overflow-hidden">

      {/* 🔥 BACKGROUND ROOM DETAILS */}
      <div className="blur-sm opacity-40 pointer-events-none">

        <main className="min-h-screen py-24 px-4">
          <div className="max-w-6xl mx-auto">

            <button className="flex items-center gap-2 text-[#1e5b4f] font-semibold mb-8">
              <FiArrowLeft />
              Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* LEFT */}
              <div className="lg:col-span-2">

                {/* IMAGE */}
                <div className="relative w-full h-[250px] md:h-[500px] rounded-3xl overflow-hidden">
                  <Image
                    src={room.imageUrl}
                    alt={room.roomName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* CONTENT */}
                <div className="mt-8">

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <h1 className="text-4xl font-black text-[#173d35]">
                      {room.roomName}
                    </h1>

                    <div className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">
                      {room.bookingCount || 0} bookings
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 mt-2 text-sm">
                    <FiCalendar />
                    Listed May 22, 2026
                  </div>

                  <p className="mt-8 text-slate-700 leading-relaxed text-lg">
                    {room.description}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div>

                <div className="bg-white border border-[#e8ddd0] rounded-3xl p-6 shadow-sm">

                  <div className="mb-8">
                    <h2 className="text-5xl font-black text-[#1e5b4f]">
                      ${room.hourlyRate}
                    </h2>

                    <p className="text-slate-500 mt-1">
                      per hour
                    </p>
                  </div>

                  <div className="space-y-5">

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
                      <span>
                        {room.bookingCount || 0} total bookings
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 🔥 MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

        <div className="relative w-full max-w-2xl bg-[#f7f4ef] rounded-3xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[95vh] border border-[#e8ddd0]">

          {/* CLOSE */}
          <button
            onClick={() => router.push(`/rooms/${id}`)}
            className="absolute top-5 right-5 text-slate-500 hover:text-black transition-all"
          >
            <FiX size={22} />
          </button>

          {/* TITLE */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#173d35]">
              Edit Room
            </h2>

            <p className="text-slate-500 mt-2">
              Update the details of your room listing.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleUpdateRoom}
            className="space-y-5"
          >

            {/* ROOM NAME */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Room Name
              </label>

              <input
                type="text"
                name="roomName"
                defaultValue={room.roomName}
                className="w-full border border-[#d8cdbf] rounded-2xl px-4 py-3 outline-none focus:border-[#1e5b4f]"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Description
              </label>

              <textarea
                name="description"
                rows={4}
                defaultValue={room.description}
                className="w-full border border-[#d8cdbf] rounded-2xl px-4 py-3 outline-none focus:border-[#1e5b4f]"
              />
            </div>

            {/* IMAGE URL */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Image URL
              </label>

              <input
                type="text"
                name="imageUrl"
                defaultValue={room.imageUrl}
                className="w-full border border-[#d8cdbf] rounded-2xl px-4 py-3 outline-none focus:border-[#1e5b4f]"
              />
            </div>

            {/* PREVIEW IMAGE */}
            <div className="relative w-full h-[250px] rounded-3xl overflow-hidden">
              <Image
                src={room.imageUrl}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* FLOOR + CAPACITY + RATE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Floor
                </label>

                <input
                  type="text"
                  name="floor"
                  defaultValue={room.floor}
                  className="w-full border border-[#d8cdbf] rounded-2xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Capacity
                </label>

                <input
                  type="number"
                  name="capacity"
                  defaultValue={room.capacity}
                  className="w-full border border-[#d8cdbf] rounded-2xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Hourly Rate ($)
                </label>

                <input
                  type="number"
                  name="hourlyRate"
                  defaultValue={room.hourlyRate}
                  className="w-full border border-[#d8cdbf] rounded-2xl px-4 py-3"
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#1e5b4f] hover:bg-[#17473d] text-white font-bold py-4 rounded-2xl transition-all"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoomPage;
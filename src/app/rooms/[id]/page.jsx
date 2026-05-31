"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import DeleteRoomButton from "@/components/DeleteRoomButton";
import BookingModal from "@/components/BookingModal";
import { authClient } from "@/lib/auth-client";
import {
  FiMapPin,
  FiUsers,
  FiEdit,
  FiBookmark,
  FiCalendar,
  FiStar,
} from "react-icons/fi";

const RoomDetailsPage = () => {
  const params = useParams();
  const id = params?.id;

  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] =
    useState(false);

  // OWNER CHECK
  const isOwner =
    session?.user?.email?.trim().toLowerCase() ===
    room?.ownerEmail?.trim().toLowerCase();

  // FETCH ROOM
  useEffect(() => {
    if (!id) return;

    const fetchRoom = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`, 
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch room");
        }

        const data = await res.json();
        setRoom(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch room details 🚨");
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
        <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ROOM NOT FOUND
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

      {/* BG EFFECT */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-emerald-200/30 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2">

            {/* IMAGE */}
            <div className="relative h-[300px] md:h-[550px] rounded-[35px] overflow-hidden shadow-2xl border border-white/30">

              <Image
                src={
                  room.imageUrl ||
                  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                }
                alt={room.roomName}
                fill
                priority
                unoptimized
                className="object-cover hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-xl text-emerald-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                <FiStar />
                Premium Room
              </div>
            </div>

            {/* CONTENT */}
            <div className="mt-8 bg-white/70 backdrop-blur-2xl border border-cyan-100 rounded-[35px] p-8 md:p-10 shadow-xl">

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-800">
                    {room.roomName}
                  </h1>

                  <div className="flex items-center gap-2 text-slate-500 mt-4 text-sm font-medium">
                    <FiCalendar />
                    Listed Room
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-5 py-2 rounded-full text-sm font-bold">
                  {room.bookingCount || 0} bookings
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-black text-slate-800 mb-4">
                  Description
                </h3>

                <p className="text-slate-600 leading-relaxed text-lg">
                  {room.description}
                </p>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-black text-slate-800 mb-5">
                  Amenities
                </h3>

                <div className="flex flex-wrap gap-3">
                  {room.amenities?.map(
                    (amenity, index) => (
                      <span
                        key={index}
                        className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-100 to-emerald-100 text-emerald-700 text-sm font-bold border border-cyan-200"
                      >
                        {amenity}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            <div className="bg-white/75 backdrop-blur-2xl border border-cyan-100 rounded-[35px] p-8 shadow-xl">

              <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-500 to-emerald-600 bg-clip-text text-transparent">
                ${room.hourlyRate}
              </h2>

              <p className="text-slate-500 mt-2 font-medium">
                per hour
              </p>

              <div className="space-y-5 my-8">

                <div className="flex items-center gap-4 bg-cyan-50 p-4 rounded-2xl">
                  <FiMapPin />
                  <div>
                    <p className="text-sm text-slate-500">
                      Floor
                    </p>
                    <h4 className="font-bold">
                      {room.floor}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-2xl">
                  <FiUsers />
                  <div>
                    <p className="text-sm text-slate-500">
                      Capacity
                    </p>
                    <h4 className="font-bold">
                      {room.capacity} people
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-cyan-50 p-4 rounded-2xl">
                  <FiBookmark />
                  <div>
                    <p className="text-sm text-slate-500">
                      Bookings
                    </p>
                    <h4 className="font-bold">
                      {room.bookingCount || 0}
                    </h4>
                  </div>
                </div>
              </div>

              {/* BOOK */}
              <button
                onClick={() => {
                  if (!session) {
                    toast.error(
                      "Please login to book a room"
                    );
                    return;
                  }

                  setShowBookingModal(true);
                }}
                className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold py-4 rounded-2xl"
              >
                Book Now
              </button>

              {/* OWNER ONLY */}
              {isOwner && (
                <div className="grid grid-cols-2 gap-4 mt-5">

                  <button
                    onClick={() =>
                      router.push(
                        `/update-room/${room._id}`
                      )
                    }
                    className="border border-cyan-200 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    <FiEdit />
                    Edit
                  </button>

                  <DeleteRoomButton
                    roomId={room._id}
                  />
                </div>
              )}
            </div>

            {/* HOST */}
            <div className="bg-white/75 backdrop-blur-2xl border border-cyan-100 rounded-[35px] p-8 shadow-xl">
              <h4 className="text-xs uppercase tracking-[4px] text-slate-400 font-black mb-6">
                Listed By
              </h4>

              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-500 flex items-center justify-center text-white font-black text-2xl">
                  {room?.ownerName?.charAt(0) || "A"}
                </div>

                <div>
                  <h3 className="font-black text-xl">
                    {room.ownerName}
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

      {showBookingModal && (
        <BookingModal
          room={room}
          onClose={() =>
            setShowBookingModal(false)
          }
          onSuccess={async () => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${room._id}`
            );
            const updatedRoom =
              await res.json();
            setRoom(updatedRoom);
          }}
        />
      )}
    </main>
  );
};

export default RoomDetailsPage;
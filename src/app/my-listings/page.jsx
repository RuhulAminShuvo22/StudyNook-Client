// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
// import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

// const MyListingsPage = () => {
//   const { data: session } = authClient.useSession();
//   const router = useRouter();

//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMyRooms = async () => {
//       if (!session?.user?.email) return;

//       try {
//         setLoading(true);

//         const res = await fetch(
//           `http://localhost:5000/rooms/user/${session.user.email}`
//         );

//         const data = await res.json();
//         setRooms(data);
//       } catch (error) {
//         console.log(error);
//         toast.error("Failed to load your listings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyRooms();
//   }, [session]);

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Delete this room?");
//     if (!confirm) return;

//     try {
//       const res = await fetch(`http://localhost:5000/rooms/${id}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message);

//       setRooms((prev) => prev.filter((room) => room._id !== id));

//       toast.success("Room deleted successfully");
//     } catch (error) {
//       console.log(error);
//       toast.error("Delete failed");
//     }
//   };

//   if (!session) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Please login first
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-emerald-50 py-20 px-4">
//       <div className="max-w-6xl mx-auto">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-10">
//           <div>
//             <h1 className="text-4xl font-black text-slate-800">
//               My Listings
//             </h1>
//             <p className="text-slate-500 mt-2">
//               Rooms you have created
//             </p>
//           </div>

//           <button
//             onClick={() => router.push("/add-room")}
//             className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-2"
//           >
//             <FiPlus />
//             Add Room
//           </button>
//         </div>

//         {/* EMPTY STATE */}
//         {rooms.length === 0 ? (
//           <div className="text-center py-20 bg-white rounded-3xl shadow">
//             <h2 className="text-2xl font-bold text-slate-700">
//               You have not created any rooms 😢
//             </h2>

//             <p className="text-slate-500 mt-2">
//               Create your first room and start listing 🚀
//             </p>

//             <button
//               onClick={() => router.push("/add-room")}
//               className="mt-6 bg-cyan-500 text-white px-6 py-3 rounded-2xl font-bold"
//             >
//               Create Room
//             </button>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-6">
//             {rooms.map((room) => (
//               <motion.div
//                 key={room._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white rounded-3xl overflow-hidden shadow-lg"
//               >
//                 <div className="relative h-60">
//                   <Image
//                     src={room.imageUrl}
//                     alt={room.roomName}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>

//                 <div className="p-6">
//                   <h2 className="text-2xl font-black">
//                     {room.roomName}
//                   </h2>

//                   <p className="text-slate-500 mt-1">
//                     {room.floor}
//                   </p>

//                   <p className="mt-3 font-bold text-emerald-600">
//                     ${room.hourlyRate}/hour
//                   </p>

//                   <div className="flex gap-3 mt-5">
//                     <button
//                       onClick={() =>
//                         router.push(`/update-room/${room._id}`)
//                       }
//                       className="flex-1 bg-cyan-100 text-cyan-700 py-2 rounded-xl font-bold flex items-center justify-center gap-2"
//                     >
//                       <FiEdit />
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => handleDelete(room._id)}
//                       className="flex-1 bg-red-100 text-red-600 py-2 rounded-xl font-bold flex items-center justify-center gap-2"
//                     >
//                       <FiTrash2 />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default MyListingsPage;


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const MyListingsPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRooms = async () => {
      // session loading শেষ না হওয়া পর্যন্ত wait করবে
      if (isPending) return;

      // login না থাকলে loading off
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const email = session.user.email.trim().toLowerCase();

        console.log("SESSION:", session);
        console.log("EMAIL:", email);

        const url = `http://localhost:5000/rooms/user/${email}`;

        console.log("FETCH URL:", url);

        const res = await fetch(url, {
          cache: "no-store",
        });

        const data = await res.json();

        console.log("ROOM DATA:", data);

        if (!res.ok) {
          throw new Error(data.message || "Failed");
        }

        setRooms(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("FETCH ERROR:", error);
        toast.error("Failed to load your listings");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRooms();
  }, [session, isPending]);

  // DELETE ROOM
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/rooms/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setRooms((prev) =>
        prev.filter((room) => room._id !== id)
      );

      toast.success("Room deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  // SESSION LOADING
  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  // LOGIN CHECK
  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Please login first
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-emerald-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-800">
              My Listings
            </h1>

            <p className="text-slate-500 mt-2">
              Rooms you have created
            </p>
          </div>

          <button
            onClick={() => router.push("/add-room")}
            className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-2"
          >
            <FiPlus />
            Add Room
          </button>
        </div>

        {/* EMPTY STATE */}
        {rooms.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow">
            <h2 className="text-2xl font-bold text-slate-700">
              You have not created any rooms 😢
            </h2>

            <p className="text-slate-500 mt-2">
              Create your first room and start listing 🚀
            </p>

            <button
              onClick={() => router.push("/add-room")}
              className="mt-6 bg-cyan-500 text-white px-6 py-3 rounded-2xl font-bold"
            >
              Create Room
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {rooms.map((room) => (
              <motion.div
                key={room._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg"
              >
                <div className="relative h-60">
                  <Image
                    src={room.imageUrl}
                    alt={room.roomName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-black">
                    {room.roomName}
                  </h2>

                  <p className="text-slate-500 mt-1">
                    {room.floor}
                  </p>

                  <p className="mt-3 font-bold text-emerald-600">
                    ${room.hourlyRate}/hour
                  </p>

                  <div className="flex gap-3 mt-5">
                    {/* EDIT */}
                    <button
                      onClick={() =>
                        router.push(`/update-room/${room._id}`)
                      }
                      className="flex-1 bg-cyan-100 text-cyan-700 py-2 rounded-xl font-bold flex items-center justify-center gap-2"
                    >
                      <FiEdit />
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="flex-1 bg-red-100 text-red-600 py-2 rounded-xl font-bold flex items-center justify-center gap-2"
                    >
                      <FiTrash2 />
                      Delete
                    </button>
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

export default MyListingsPage;
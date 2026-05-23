"use client";

import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

const DeleteRoomButton = ({ roomId }) => {
  const router = useRouter();

  const handleDeleteRoom = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmDelete) {
      toast("Delete cancelled ❌");
      return;
    }

    const toastId = toast.loading("Deleting room...");

    try {
      const res = await fetch(
        `http://localhost:5000/rooms/${roomId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Room deleted successfully 🗑️", {
          id: toastId,
        });

        setTimeout(() => {
          router.push("/rooms");
        }, 1200);

      } else {
        toast.error("Failed to delete room ❌", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong 🚨", {
        id: toastId,
      });
    }
  };

  return (
    <button
      onClick={handleDeleteRoom}
      className="border border-red-200 bg-red-50 hover:bg-red-100 text-red-500 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
    >
      <FiTrash2 />
      Delete
    </button>
  );
};

export default DeleteRoomButton;
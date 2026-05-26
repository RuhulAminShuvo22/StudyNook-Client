"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";

export default function ProfilePage() {
  // Session
  const { data: session, isPending } = authClient.useSession();

  // States
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  // ======================================================
  // FETCH USER
  // ======================================================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!session?.user?.id) return;

        const res = await fetch(
          `http://localhost:5000/users/${session.user.id}`
        );

        const data = await res.json();

        // Save user
        setUser(data);

        // Fill form
        setFormData({
          name: data?.name || "",
          image: data?.image || "",
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to load profile");
      }
    };

    fetchUser();
  }, [session]);

  // ======================================================
  // UPDATE PROFILE
  // ======================================================

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/users/${session.user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        // Update local UI instantly
        setUser((prev) => ({
          ...prev,
          ...formData,
        }));

        toast.success("Profile updated successfully ✨");

        setEditMode(false);
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  // Avatar Letter
  const avatarLetter =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg border p-8">

        {/* HEADER */}
        <div className="flex items-center gap-5 border-b pb-6">

          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">

            {user?.image ? (
              <Image
                src={user.image}
                alt="profile"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            ) : (
              avatarLetter
            )}

          </div>

          {/* User Info */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {user?.name || "Unknown User"}
            </h2>

            <p className="text-slate-500 text-sm">
              {user?.email}
            </p>

            <p className="text-xs mt-1 text-blue-600 font-semibold">
              Student Account
            </p>
          </div>
        </div>

        {/* BODY */}
        <div className="mt-8 space-y-5">

          {/* NAME */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Name
            </label>

            <input
              type="text"
              disabled={!editMode}
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full mt-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Profile Image URL
            </label>

            <input
              type="text"
              disabled={!editMode}
              value={formData.image}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.value,
                })
              }
              className="w-full mt-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              disabled
              value={user?.email || ""}
              className="w-full mt-1 px-4 py-3 rounded-xl border bg-slate-100"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-4">

            {!editMode ? (
              <Button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 text-white font-bold px-6 py-2 rounded-xl"
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="bg-emerald-600 text-white font-bold px-6 py-2 rounded-xl"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>

                <Button
                  onClick={() => setEditMode(false)}
                  className="bg-slate-200 text-slate-700 font-bold px-6 py-2 rounded-xl"
                >
                  Cancel
                </Button>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}